const mongoose = require('mongoose');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const inboxdb = require('../schemas/inbox');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;


exports.getEmail = async (req, res) => {
    try {
        let email = await emaildb.findOne({_id: req.query._id});
        if (email == null) {
            res.status(404).send("Email doesn't exist");
        }
        res.status(200).send(email);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};

exports.getInbox = async(req, res) => {
    try {
        let inbox = await inboxdb.find({ userId: req.body.userId, inboxName: req.query.inboxName.tolowercase() })
        .populate({ path: 'emails', options: { sort: { createdAt: 'asc' } } });
        if (inbox == null) {
            res.status(404).send("Inbox doesn't exist");
        }
        res.status(200).send(inbox);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
};

exports.moveEmail = async(req, res) => {
    try {
        let fromInbox = await inboxdb.find({ userId: req.body.userId, inboxName: req.body.fromInboxName.tolowercase()});
        let toInbox = await inboxdb.find({ userId: req.body.userId,  inboxName: req.body.toInboxName.tolowercase()});
        if ( (fromInbox == null) || (toInbox == null) ) {
            res.status(404).send("Inbox doesn't exist");
        }
        //delete email from fromInbox
        const tempFromArray = fromInbox.emails.filter((email) => email._id != req.body.emailId);
        fromInbox.emails = tempFromArray;
        await fromInbox.save();
        
        // add email to toInbox
        toInbox.emails.push(req.body.emailId);
        await toInbox.save();
        res.status(200).send("Email moved successfully");
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
};

exports.sendEmail = async(req, res) => {
    try {
        const {to, subject, contents} = req.body;
        let email = new emaildb({from: req.user.email, fromName: req.user.fromFirstName, to, subject, contents});
        let savedEmail = await email.save();
        res.status(200).send(savedEmail);
    } catch (error) {
        console.log(error.message);
        res.status(401).send(error.message);
    }
}

exports.getUserInfo = async (req, res) => {
    try{
        const {email} = req.body;
        const tempUser = await userdb.findOne({email: email});
        if(tempUser == null) {
        res.status(404).send("Account doesn't exist");
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