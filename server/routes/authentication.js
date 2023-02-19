const jwt = require('jsonwebtoken');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const bcrypt = require('bcrypt');
const jwtSecretKey = 's3Cr3Tk3Y';

exports.register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if( (await userdb.findOne({email: email}))  != null) {
          res.status(403).send("Account already exist");
          return;
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        let newUser = new userdb({
            firstName,
            lastName,
            password: hashedPassword,
            email,
        });
        let savedUser = await newUser.save();
        delete savedUser.password;
        res.status(201).json(savedUser); 
    } catch(error) {
        res.status(400).send(error.message);
    }
    
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await userdb.findOne({email: email});
    if(user == null) {
      res.status(404).send("Account doesn't exist");
      return;
    }
    if(! (await bcrypt.compare(password, user.password))) {
      res.status(400).send("Invalid Credential");
      return;
    }
    
    const accessToken = jwt.sign({email,password}, jwtSecretKey, {
      expiresIn: '24h',
      algorithm: 'HS256'
    });

    delete user.password
    res.status(200).json({user,
      accessToken: accessToken});
  } catch(error) {
    res.status(500).send(error.message);
  }
};


exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(400);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(400);
  }
};

exports.authorize = (req,res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, jwtSecretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.status(200).send(user);
    });
  } else {
    res.sendStatus(403);
  }
}

exports.changePassword = async (req, res) => {
  try {
      if( (req.body.email.length <= 0) || (req.body.firstName.length <= 0) ) {
        res.status(400).send("Invalid Credential");
        return;
      }
      const tempUser = await userdb.findOne({email: req.body.email});
      if(tempUser == null) {
        res.status(404).send("Account doesn't exist");
        return;
      }
      if(tempUser.firstName.toLowerCase() != req.body.firstName.toLowerCase()) {
          res.status(400).send("Invalid Credential");
          return;
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.newPassword,salt);
      tempUser.password = hashedPassword;
      tempUser.updatedAt = Date.now();
      const newUser = await tempUser.save();
      delete newUser.password
      res.status(200).json(newUser);
    } catch(error) {
      res.status(500).send(error.message);
    }
};