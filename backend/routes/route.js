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
        
        let email = await emaildb.findOne({_id: req.params.id})
        .populate('from')
        .populate('to')
        .populate('files')
        .populate('photos')
        .populate('replies')
        .populate({path:'replies', populate:[{path:'from'},{path:'files'}, {path:'photos'}]});
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

exports.updateEmail = async(req, res) => {
    try {
        const {userId, emailId, starred} = req.body;   
        const email = await emaildb.findOne({_id: emailId}); 
        if(email == null) {
            res.status(404).send("Email doesn't exist");
            return;
        }
        const inbox = await inboxdb.findOne({userId: userId, inboxName: 'starred'});
        if(inbox == null) {
            res.status(404).send("Invalid User ID");
            return;
        }
        email.starred = starred;
        if(starred && !inbox.emails.includes(emailId)) {
            inbox.emails = [...inbox.emails, emailId];
            console.log(`Email added to starred inbox ${inbox._id} : ${inbox.emails}`);
        } else {
            inbox.emails = inbox.emails.filter((id) => {return(id != emailId)});
            console.log(`Email removed from starred inbox ${inbox._id} : ${inbox.emails}`);
        }
        await email.save();
        await inbox.save();
        console.log(`Email updated: ${email}`);
        res.status(200).send({message:"Email updated successfully"});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}



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

function parseEmails(input) {
    const emailPattern = /\b[a-zA-Z0-9._%+-]+@mailman\.com\b/g;
    const emails = input.match(emailPattern) || [];
    return emails;
  }

exports.sendEmail = async(req, res) => {
    try {
        const {userId, from, fromFirstName, to, subject, contents, files= [], photos= []} = req.body; 
        
        let fileIds = [];
        let photoIds = [];
        let toEmails = parseEmails(to);
        console.log(`send email request from ${from} to ${to} with subject ${subject} and contents ${contents}`);
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
        let userRecipients = [];
        for(let i =0; i<toEmails.length; i++) {
            let tempUser = await userdb.findOne({email: toEmails[i]});
            if(tempUser !== null) {
                userRecipients.push(tempUser);
            }
        }
        let email = new emaildb({from: userId, to: ([userRecipients].length < 0? '': userRecipients.map(user => user._id)), subject, contents, files: fileIds, photos: photoIds}); 
        let savedEmail = await email.save();
        const fromInbox = await inboxdb.findOne({ userId: userId, inboxName: 'sent'});
        const userAllEmails = await inboxdb.findOne({ userId: userId, inboxName: 'all emails'});
        fromInbox.emails.push(savedEmail._id);
        userAllEmails.emails.push(savedEmail._id);
        if(userRecipients.length > 0) {
            for(let i =0; i<userRecipients.length; i++) {
                let toInbox = await inboxdb.findOne({ userId: userRecipients[i]._id,  inboxName: 'inbox'});
                let userRecepientAllEmails = await inboxdb.findOne({ userId: userRecipients[i]._id,  inboxName: 'all emails'});
                toInbox.emails.push(savedEmail._id);
                userRecepientAllEmails.emails.push(savedEmail._id);
                await toInbox.save();
                await userRecepientAllEmails.save();
            }

        }
        await fromInbox.save();
        await userAllEmails.save();
        res.status(201).send({message:"Email sent successfully", email: savedEmail});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
}

exports.replyEmail = async(req, res) => { 
    try {
        const {userEmail, userFirstName, originalEmailId,contents, files= [], photos=[]} = req.body;

        var fileIds = [];
        let originalEmail = await emaildb.findOne({_id: originalEmailId});
        if(originalEmail == null) {
            res.status(404).send("Email doesn't exist");
            return;
        }
        const fromUser = await userdb.findOne({email: userEmail});
        if(fromUser == null) {
            res.status(404).send("User doesn't exist");
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
        let replyEmail = new replydb({from: fromUser._id, contents, files: fileIds, photos: photoIds});
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
        let toEmails = parseEmails(to);
        let userRecipients = [];
        for(let i =0; i<toEmails.length; i++) {
            let tempUser = await userdb.findOne({email: toEmails[i]});
            if(tempUser !== null) {
                userRecipients.push(tempUser);
            }
        }
        let email = new emaildb({from: userId, to: ([userRecipients].length < 0? '': userRecipients.map(user => user._id)), subject, contents, files: fileIds, photos: photoIds}); 
        let savedEmail = await email.save();
        const fromInbox = await inboxdb.findOne({ userId: userId, inboxName: 'sent'});
        const userAllEmails = await inboxdb.findOne({ userId: userId, inboxName: 'all emails'});
        fromInbox.emails.push(savedEmail._id);
        userAllEmails.emails.push(savedEmail._id);
        await fromInbox.save();
        await userAllEmails.save();
        if(userRecipients.length > 0) {
            for(let i =0; i<userRecipients.length; i++) {
                let toInbox = await inboxdb.findOne({ userId: userRecipients[i]._id,  inboxName: 'inbox'});
                let userRecepientAllEmails = await inboxdb.findOne({ userId: userRecipients[i]._id,  inboxName: 'all emails'});
                toInbox.emails.push(savedEmail._id);
                userRecepientAllEmails.emails.push(savedEmail._id);
                await toInbox.save();
                await userRecepientAllEmails.save();
            }

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

const getTimeframeFilter = (timeframe) => {
    const now = new Date();
  
    let filter = {};
  
    switch (timeframe) {
      case 'today':
        filter = {
          createdAt: {
            $gte: new Date(now.getFullYear(), now.getMonth(), now.getDate()),
          },
        };
        break;
      case '3d':
        filter = {
          createdAt: {
            $gte: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case '1w':
        filter = {
          createdAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case '1m':
        filter = {
          createdAt: {
            $gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000),
          },
        };
        break;
      case 'all':
      default:
        filter = {};
    }
  
    return filter;
  };
  

exports.getInbox = async(req, res) => {
    try {   
        const {userId, inboxName} = req.params;
        const { page = 1, limit = 10, timeframe="all",search="" } = req.query;
        console.log(`INBOX REQEUEST userId: ${userId}, inboxName: ${inboxName}, page: ${page}, limit: ${limit} timeframe: ${timeframe} search: [${search}]`);
        const skip = (page - 1) * limit;
        let count;
        let totalPages;
        let inbox;
        let timeframeFilter = getTimeframeFilter(timeframe);
        let searchFilter = {};
        if (search.length > 0) {
            timeframeFilter = getTimeframeFilter("all");
            searchFilter = {
              $or: [
                { contents: { $regex: search, $options: "i" } },
                { subject: { $regex: search, $options: "i" } },
                { "from.firstName": { $regex: search, $options: "i" } },
                { "from.lastName": { $regex: search, $options: "i" } },
                { "from.email": { $regex: search, $options: "i" } },
                { to: {
                      $elemMatch: {
                        $or: [
                          { firstName: { $regex: search, $options: "i" } },
                          { lastName: { $regex: search, $options: "i" } },
                          { email: { $regex: search, $options: "i" } },
                        ],
                      },
                    },
                },
              ],
            };
          }

        if(inboxName.toLowerCase() === 'drafts') {
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()}) 
            .populate({ 
                path: 'drafts', 
                match: { ...timeframeFilter, ...searchFilter },
                options: { skip: skip, limit: limit, sort: { createdAt: -1 } }
              });
        } else {
            inbox = await inboxdb.findOne({ userId: userId, inboxName: inboxName.toLowerCase()})
            .populate('emails')   
            .populate({
                path:'emails',
                match: { ...timeframeFilter, ...searchFilter },
                populate:[{path:'from'}, {path:'to'}], 
                options: { skip: skip, limit: limit , sort: { createdAt: -1 }}
            });
        }
        if (inbox == null) {
            res.status(404).send("Inbox doesn't exist");
            return;
        }

         // Get the reference model based on the inboxName
         const refModel = inboxName.toLowerCase() === 'drafts' ? 'DraftEmail' : 'Email';

        // Calculate the total count based on the filter
        count = await mongoose.model(refModel).countDocuments({
        _id: {
            $in: inboxName.toLowerCase() === 'drafts' ? inbox.drafts : inbox.emails,
        },
        ...timeframeFilter,
        ...searchFilter,
        });

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
