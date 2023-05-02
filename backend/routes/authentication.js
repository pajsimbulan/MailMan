const jwt = require('jsonwebtoken');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const inboxdb = require('../schemas/inbox');
const bcrypt = require('bcryptjs');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.register = async (req, res) => {
    try {
        console.log(`Register request: ${req.body.email} ${req.body.password}`);
        const {firstName, lastName, email, password, secretPhrase} = req.body;
        if( (await userdb.findOne({email: email}))  != null) {
          console.log(`Account already exist: ${email}`);
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
            secretPhrase,
        });
        let savedUser = await newUser.save();
        delete savedUser.password;
        //initialize inboxes
        savedUser.inboxes.forEach(async (inboxName) => {
          let newInbox = new inboxdb({
            userId: savedUser._id,
            inboxName,
          });
          await newInbox.save();
        });
        res.status(201).json(savedUser); 
    } catch(error) {
        console.log('Error, account not created');
        res.status(400).send(error.message);
    }
    
}

exports.login = async (req, res) => {
  try {
    console.log(`Login request: ${req.body.email} ${req.body.password}`);
    const {email, password} = req.body;
    const user = await userdb.findOne({email: email});
    if(user == null) {
      res.status(404).send("Account doesn't exist");
      return;
    }
    if(! (await bcrypt.compare(password, user.password))) {
      console.log(`Invalid password: ${password} ${user.password}`);
      res.status(400).send("Invalid Credential");
      return;
    }
    console.log(`type of avatar ${typeof user.avatar}`);
    console.log(`avatar = ~${user.avatar}`);
    const accessToken = jwt.sign({email,password}, jwtSecretKey, {
      algorithm: 'HS256'
    });

    delete user.password;
    res.status(200).json({user,
      accessToken: accessToken,});
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
      req.userEmail = user.email;
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
    console.log(`Change Password request: ${req.body.email} ${req.body.firstName} ${req.body.secretPhrase} ${req.body.newPassword}`);
      if( (req.body.email.length <= 0) || (req.body.firstName.length <= 0) || (req.body.secretPhrase.length <= 0)) {
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
      if(tempUser.secretPhrase.toLowerCase() != req.body.secretPhrase.toLowerCase()) {
        console.log(`Invalid secretPhrase: ${tempUser.secretPhrase} ${req.body.secretPhrase}`);
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

exports.updateUserInfo = async (req, res) => {
  try {
      const {email, firstName, lastName, gender, birthDate, avatar, newPassword=''} = req.body;
      const tempUser = await userdb.findOne({email: email});
      if(tempUser == null) {
        res.status(404).send("Account doesn't exist");
        return;
      }
      if(newPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword,salt);
        tempUser.password = hashedPassword;
      }
      if(avatar) {
        tempUser.avatar = avatar;
      }
      tempUser.firstName = firstName;
      tempUser.lastName = lastName;
      tempUser.gender = gender;
      tempUser.birthDate = birthDate;
      tempUser.updatedAt = Date.now();
      const newUser = await tempUser.save();
      res.status(200).json(newUser);
    } catch(error) {
      res.status(500).send(error.message);
    }
}