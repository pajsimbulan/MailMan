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
        
        let email = await emaildb.findOne({_id: req.params.id}).populate('files').populate('photos')
        .populate('replies')
        .populate({path:'replies', populate:[{path:'files'}, {path:'photos'}]});
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
        const {userId, from, fromFirstName, to, subject, contents, files= [], photos= []} = req.body;   
        let fileIds = [];
        let photoIds = [];
        if(files.length > 0) {
            files.forEach( (file) => {

                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        if(photos.length > 0) {
            photos.forEach( (file) => {

                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                photoIds.push(newFile._id);
            });
        }
        let email = new emaildb({from, fromFirstName, to, subject, contents, files: fileIds, photos: photoIds}); 
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
        const {userEmail, userFirstName, originalEmailId,contents, files= [], photos=[]} = req.body;
        console.log(`got these user inputs: ${userEmail}, ${userFirstName}, ${originalEmailId}, ${contents}, ${files}, ${photos}`);
        var fileIds = [];
        let originalEmail = await emaildb.findOne({_id: originalEmailId});
        if(originalEmail == null) {
            res.status(404).send("Email doesn't exist");
            return;
        }
        if(files.length > 0) {
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        var photoIds = [];
        if(photos.length > 0) {
            photos.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                photoIds.push(newFile._id);
            });
        }
        let replyEmail = new replydb({from: userEmail, fromFirstName: userFirstName, contents, files: fileIds, photos: photoIds});
        replyEmail.save();
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
        const {userId, to, subject, contents, files=[], photos=[]} = req.body;   
        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                console.log(`filename: ${file.name} filedata: ${file.data}`);
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        if(photos.length > 0) {
            var photoIds = [];
            photos.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                photoIds.push(newFile._id);
            });
        }
        const draftEmail = new draftdb({userId, to, subject, contents, files: fileIds, photos: photoIds}); 
        const drafts = await inboxdb.findOne({ userId: userId, inboxName: 'drafts'});
        if(drafts == null) {
            res.status(404).send("User doesn't exist");
            return;
        }
        const savedDraftEmail = await draftEmail.save();
        drafts.drafts.push(savedDraftEmail._id);
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
        const {draftId, to, subject, contents, files=[], photos=[]} = req.body;   
        const draftEmail = await draftdb.findOne({_id: draftId}); 
        if(draftEmail == null) {
            res.status(404).send("Draft doesn't exist");
            return;
        }
        if(files.length > 0) {

            //delete old files
            if (draftEmail.files.length > 0) {
                await filedb.deleteMany({ _id: { $in: draftEmail.files } });
            }
            var fileIds = [];
            files.forEach((file) => {
                    let newFile = new filedb({name: file.name, data: file.data});
                    newFile.save();
                    fileIds.push(newFile._id);
            });
        } else {
            if (draftEmail.files.length > 0) {
                await filedb.deleteMany({ _id: { $in: draftEmail.files } });
            }
        }
        if(photos.length > 0) {
            var photoIds = [];
            
            //delete old photos
            if (draftEmail.photos.length > 0) {
                await filedb.deleteMany({ _id: { $in: draftEmail.photos } });
            }
            
            photos.forEach((file) => {
                    let newFile = new filedb({name: file.name, data: file.data});
                    newFile.save();
                    photoIds.push(newFile._id);
            });
        } else {
            if (draftEmail.photos.length > 0) {
                await filedb.deleteMany({ _id: { $in: draftEmail.photos } });
            }
        }
        draftEmail.to = to;
        draftEmail.subject = subject;
        draftEmail.contents = contents;
        if(files.length > 0) {
            draftEmail.files= [...draftEmail.files, ...fileIds];
        }
        if(photos.length > 0) {
            draftEmail.photos= [...draftEmail.photos, ...photoIds];
        }
        const savedDraftEmail = await draftEmail.save();
        res.status(200).send({message:"Draft updated successfully", draft: savedDraftEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}


exports.getDraft = async(req, res) => {
    try {
        let draftEmail = await draftdb.findOne({_id: req.params.id }).populate('files').populate('photos');
        if (draftEmail == null) {
            res.status(404).send("Draft Email doesn't exist");
            return;
        }
        console.log(`returning draftEmail: ${draftEmail}`);
        res.status(200).send(draftEmail);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.postDraft = async(req, res) => {
    try {
        const {userId, draftId, from, fromFirstName, to, subject, contents, files=[], photos=[]} = req.body;

        //delete draft from drafts db
        await draftdb.deleteOne({_id: draftId});
        const draftInbox = await inboxdb.findOne({ userId: userId, inboxName: 'drafts'});
        const tempDrafts = draftInbox.drafts.filter((draft) => {return(draft._id.toString() !== draftId);});
        draftInbox.drafts = [...tempDrafts];
        await draftInbox.save();

        if(files.length > 0) {
            var fileIds = [];
            files.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                fileIds.push(newFile._id);
            });
        }
        if(photos.length > 0) {
            var photoIds = [];
            photos.forEach((file) => {
                let newFile = new filedb({name: file.name, data: file.data});
                newFile.save();
                photoIds.push(newFile._id);
            });
        }

        //send email
        let email = new emaildb({from, fromFirstName, to, subject, contents, files: fileIds, photos: photoIds}); 
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
        const tempDraftsArray = drafts.drafts.filter((draftEmail) => { return (!draftIdArray.includes(draftEmail._id.toString()));});
        drafts.drafts = [...tempDraftsArray];

        //delete files from files db
        drafts.files.forEach((file) => {
            filedb.deleteOne({_id: file._id});
        });

        //delete photos from files db
        drafts.photos.forEach((photo) => {
            filedb.deleteOne({_id: photo._id});
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
        let tempInbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase() });
        let count;
        let totalPages;
        let inbox;

        if(inboxName.toLowerCase() === 'drafts') {
            console.log('iti s drafts');
            tempInbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase() });
            count = tempInbox.drafts.length;
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()}) 
            .populate('drafts')   
                .populate({path:'drafts', populate:[{path:'files'}, {path:'photos'}], options: { skip: skip, limit: limit , sort: { createdAt: -1 }}});   
        } else {
            tempInbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase() });
            count = tempInbox.emails.length;
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()})
                .populate('emails')   
                .populate({path:'emails', populate:[{path:'replies'}, {path:'files'}, {path:'photos'}], options: { skip: skip, limit: limit , sort: { createdAt: -1 }}});
        }
        if (inbox == null) {
            res.status(404).send("Inbox doesn't exist");
            return;
        }
        totalPages = Math.ceil(count / limit);

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
