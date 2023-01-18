const jwt = require('jsonwebtoken');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const bcrypt = require('bcrypt');
const { use } = require('../server');
const jwtSecretKey = 's3Cr3Tk3Y';

exports.register = async (req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if( (await userdb.findOne({email: email}))  != null) {
          res.status(401).send("Account already exist");
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
        res.status(201).json(savedUser); 
    } catch(error) {
        res.status(500).send(error.message);
    }
    
}

exports.login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const tempUser = await userdb.findOne({email: email});
    if(tempUser == null) {
      res.status(401).send("Account doesn't exist");
      return;
    }
    if(! (await bcrypt.compare(password, tempUser.password))) {
      res.status(401).send("Invalid Credential");
      return;
    }
    
    const accessToken = jwt.sign({email,password}, jwtSecretKey, {
      expiresIn: '1h',
      algorithm: 'HS256'
    });
    res.status(200).json({email, accessToken: accessToken});
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
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
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
    res.sendStatus(401);
  }
}
