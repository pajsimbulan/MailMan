const mongoose = require('mongoose');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const inboxdb = require('../schemas/inbox');
const replydb = require('../schemas/replyEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;


exports.getEmail = async (req, res) => {
    try {
        console.log(`email id: ${req.params.id}`);
        let email = await emaildb.findOne({_id: req.params.id}).populate('replies');
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
        const {userId, inboxName} = req.params;
        let inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()})
        .populate('emails').populate({path:'emails', populate:{path:'replies'}});
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
        const {userId, fromInboxName, toInboxName, emailId} = req.body;
        let fromInbox = await inboxdb.findOne({ userId: userId, inboxName: fromInboxName.toLowerCase()});
        let toInbox = await inboxdb.findOne({ userId: userId,  inboxName: toInboxName.toLowerCase()});
        if ( (fromInbox == null) || (toInbox == null) ) {
            res.status(404).send("Inbox doesn't exist");
        }
        //delete email from fromInbox
        const tempFromArray = fromInbox.emails.filter((email) => email._id != emailId);
        fromInbox.emails = [...tempFromArray];
        await fromInbox.save();
        
        // add email to toInbox
        toInbox.emails.push(emailId);
        await toInbox.save();
        res.status(200).send("Email moved successfully");
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
};


exports.sendEmail = async(req, res) => {
    try {
        const {userId, from, fromFirstName, to, subject, contents} = req.body;   
        let email = new emaildb({from, fromFirstName, to, subject, contents}); 
        let savedEmail = await email.save();
        const fromInbox = await inboxdb.findOne({ userId: userId, inboxName: 'sent'});
        const userAllEmails = await inboxdb.findOne({ userId: userId, inboxName: 'all emails'});
        fromInbox.emails.push(savedEmail._id);
        userAllEmails.emails.push(savedEmail._id);
        await fromInbox.save();
        await userAllEmails.save();
        let userRecipient = await userdb.findOne({email: to});
        if(userRecipient !== null) {
            const toInbox = await inboxdb.findOne({ userId: userRecipient._id,  inboxName: 'inbox'});
            const userRecepientAllEmails = await inboxdb.findOne({ userId: userRecipient._id,  inboxName: 'all emails'});
            toInbox.emails.push(savedEmail._id);
            userRecepientAllEmails.emails.push(savedEmail._id);
            await toInbox.save();
            await userRecepientAllEmails.save();
        }
        res.status(201).send("Email sent successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.replyEmail = async(req, res) => { 
    try {
        const {userEmail, userFirstName, originalEmailId,contents} = req.body;
        let replyEmail = new replydb({from: userEmail, fromFirstName: userFirstName, contents});
        replyEmail.save();
        console.log(originalEmailId);
        let originalEmail = await emaildb.findOne({_id: originalEmailId});
        console.log(originalEmail);
        if(originalEmail == null) {
            res.status(404).send("Email doesn't exist");
        }
        originalEmail.replies.push(replyEmail._id);
        originalEmail.save();
        res.status(201).send(replyEmail);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

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