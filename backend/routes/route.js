const mongoose = require('mongoose');
const userdb = require('../schemas/user');
const emaildb = require('../schemas/email');
const inboxdb = require('../schemas/inbox');
const replydb = require('../schemas/replyEmail');
const draftdb  = require('../schemas/draft');
const filedb = require('../schemas/file');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;


exports.getEmail = async (req, res) => {
    try {
        let email = await emaildb.findOne({_id: req.params.id}).populate('replies').populate('files');
        if (email == null) {
            res.status(404).send("Email doesn't exist");
            return;
        }
        res.status(200).send(email);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
};


exports.moveEmails = async(req, res) => {
    try {
        const {userId, fromInboxName, toInboxName, emailIdArray} = req.body;
        let fromInbox = await inboxdb.findOne({ userId: userId, inboxName: fromInboxName.toLowerCase()});
        let toInbox = await inboxdb.findOne({ userId: userId,  inboxName: toInboxName.toLowerCase()});
        if ( (fromInbox == null) || (toInbox == null) ) {
            res.status(404).send("Inbox doesn't exist");
            return;
        }
        //delete emails from fromInbox
        const tempFromArray = fromInbox.emails.filter((email) => {return(!emailIdArray.includes(email._id.toString()));});
        fromInbox.emails = [...tempFromArray];
        await fromInbox.save();
        
        // add email to toInbox
        toInbox.emails = [...toInbox.emails, ...emailIdArray];
        await toInbox.save();
        res.status(200).send("Email moved successfully");
    
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
};

exports.sendEmail = async(req, res) => {
    try {
        const {userId, from, fromFirstName, to, subject, contents, files= []} = req.body;   
        console.log(`Send email request: ${userId} ${from} ${fromFirstName} ${to} ${subject} ${contents} ${files}`);
        let fileIds = [];
        if(files.length > 0) {
            files.forEach( (file) => {

                let newFile = new filedb({name: file.name, data: Buffer.from(file.data, 'base64')});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        let email = new emaildb({from, fromFirstName, to, subject, contents, files: fileIds}); 
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
        console.log(`Email sent successfully: ${savedEmail}`);
        res.status(201).send({message:"Email sent successfully", email: savedEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.replyEmail = async(req, res) => { 
    try {
        const {userEmail, userFirstName, originalEmailId,contents, files= []} = req.body;
        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: Buffer.from(file.data, 'base64')});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        let replyEmail = new replydb({from: userEmail, fromFirstName: userFirstName, contents, files: fileIds});
        replyEmail.save();
        let originalEmail = await emaildb.findOne({_id: originalEmailId});
        if(originalEmail == null) {
            res.status(404).send("Email doesn't exist");
            return;
        }
        originalEmail.replies.push(replyEmail._id);
        originalEmail.save();
        res.status(201).send({message:"Reply sent successfully", reply: replyEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


exports.createDraft = async(req, res) => {
    try {
        const {userId, to, subject, contents, files=[]} = req.body;   
        console.log(`got these userId, to, subject, contents, files: ${userId}, ${to}, ${subject}, ${contents}, ${files}`);
        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: Buffer.from(file.data, 'base64')});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        const draftEmail = new draftdb({userId, to, subject, contents, files: fileIds}); 
        const drafts = await inboxdb.findOne({ userId: userId, inboxName: 'drafts'});
        if(drafts == null) {
            res.status(404).send("User doesn't exist");
            return;
        }
        const savedDraftEmail = await draftEmail.save();
        drafts.emails.push(savedDraftEmail._id);
        await drafts.save();
        console.log(`savedDraftEmail: ${savedDraftEmail}`);
        res.status(201).send(savedDraftEmail);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.updateDraft = async(req, res) => {
    try {
        const {draftId, to, subject, contents, files=[]} = req.body;   
        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: Buffer.from(file.data, 'base64')});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        const draftEmail = await draftdb.findOne({_id: draftId}); 
        if(draftEmail == null) {
            res.status(404).send("Draft doesn't exist");
            return;
        }
        draftEmail.to = to;
        draftEmail.subject = subject;
        draftEmail.contents = contents;
        draftEmail.files= [...draftEmail.files, ...fileIds];
        const savedDraftEmail = await draftEmail.save();
        res.status(200).send({message:"Draft updated successfully", draft: savedDraftEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


exports.getDraft = async(req, res) => {
    try {
        let draftEmail = await draftdb.findOne({_id: req.params.id }).populate('files');
        if (draftEmail == null) {
            res.status(404).send("Draft Email doesn't exist");
            return;
        }
        res.status(200).send(draftEmail);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.postDraft = async(req, res) => {
    try {
        const {userId, draftId, from, fromFirstName, to, subject, contents, files=[]} = req.body;

        

        //delete draft from drafts db
        await draftdb.deleteOne({_id: draftId});
        const draftInbox = await inboxdb.findOne({ userId: userId, inboxName: 'drafts'});
        const tempDrafts = draftInbox.emails.filter((email) => {return(email._id.toString() !== draftId);});
        draftInbox.emails = [...tempDrafts];
        await draftInbox.save();

        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }

        //send email
        let email = new emaildb({from, fromFirstName, to, subject, contents, files: fileIds}); 
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

        //return email
        res.status(201).send({message:"Email sent successfully", email: savedEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


exports.deleteDrafts = async(req, res) => {
    try {
        const {userId, draftIdArray} = req.body;
        const drafts = await inboxdb.findOne({ userId: userId, inboxName: 'drafts'});
        if(drafts == null) {
            res.status(404).send("User doesn't exist");
            return;
        }
        const tempDraftsArray = drafts.emails.filter((draftEmail) => { return (!draftIdArray.includes(draftEmail._id.toString()));});
        drafts.emails = [...tempDraftsArray];

        //delete files from files db
        drafts.files.forEach((file) => {
            filedb.deleteOne({_id: file._id});
        });
        
        await drafts.save();
        res.status(200).send("Drafts deleted successfully");
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


exports.getInbox = async(req, res) => {
    try {   
        const {userId, inboxName} = req.params;
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const tempInbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase() }).populate('emails');
        const count = tempInbox.emails.length;
        const totalPages = Math.ceil(count / limit);
        let inbox;

        if(inboxName.toLowerCase() === 'drafts') {
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()}) 
                .populate({path:'drafts', options: { skip: skip, limit: limit , sort: { createdAt: -1 }}});
        } else {
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()})
                .populate('emails')   
                .populate({path:'emails', populate:[{path:'replies'}, {path:'files'}], options: { skip: skip, limit: limit , sort: { createdAt: -1 }}});
        }
        if (inbox == null) {
            res.status(404).send("Inbox doesn't exist");
            return;
        }

        console.log(`inbox: ${inbox}`);
        res.status(200).send({
            inbox,
            pagination: {
              page: page,
              limit: limit,
              totalCount: count,
              totalPages: totalPages
            }
          });
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
    
};
