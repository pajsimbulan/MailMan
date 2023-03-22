const mongoose = require('mongoose');

const inboxSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,    
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

});

const inbox = mongoose.model("Inbox", inboxSchema);

module.exports = inbox;