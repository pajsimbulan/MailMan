const mongoose = require('mongoose');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const bcrypt = require('bcrypt');
const jwtSecretKey = 's3Cr3Tk3Y';
const jwt = require('jsonwebtoken');


exports.getEmail = async (req, res) => {
    try {
        let email = await emaildb.findOne({_id: req.query._id});
        if (email == null) {
            email = undefined;
        }
        res.status(200).send(email);
    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message);
    }
};

exports.getAllEmails = async(req, res) => {
    try {
        console.log(req.user.email);
        let emails = await emaildb.find({from: req.user.email});
        console.log(emails);
        emails = emails.concat(await emaildb.find({to: req.user.email}));
        emails.sort((a,b) => {return (b-a)});
        res.status(200).send(emails);
        return emails;
    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message);
    }
    
};

exports.sendEmail = async(req, res) => {
    try {
        const {to, from, subject, contents} = req.body;
        let email = new emaildb({from: req.user.email, to, subject, contents});
        let savedEmail = await email.save();
        res.status(200).send(savedEmail);
    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message);
    }
}

exports.getUserInfo = async (req, res) => {
    try{
        const {email, password} = req.body;
        const tempUser = await userdb.findOne({email: email});
        if(tempUser == null) {
        res.status(404).send("Account doesn't exist");
        return;
        }
        if(! (await bcrypt.compare(password, tempUser.password))) {
        res.status(400).send("Invalid Credential");
        return;
        }
        res.status(200).json({firstName: tempUser.firstName,
            email: tempUser.email,
            createdAt: tempUser.createdAt,
            lastName: tempUser.lastName,
            gender: tempUser.gender,
            birthDate: tempUser.birthDate});
  } catch(error) {
    res.status(500).send(error.message);
  }
};


exports.updateUserInfo = async (req, res) => {
    try {
        const {email, firstName, lastName, gender, birthDate} = req.body;
        const tempUser = await userdb.findOne({email: email});
        if(tempUser == null) {
          res.status(404).send("Account doesn't exist");
          return;
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