const mongoose = require('mongoose');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');


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

//idk yet
//app.put('/v0/email/:id', auth.check, route.move); 