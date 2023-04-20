const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,    
        ref: 'User',
    },
    inboxName: {
        type: String,
        required: true,
        min: 3,
        max: 20,
    },
    emails: {
        type:[mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Email',
    },
    drafts: {
        type:[mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'DraftEmail',
    },

});

const inbox = mongoose.model("Inbox", inboxSchema);

module.exports = inbox;