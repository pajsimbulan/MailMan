const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
       
        to: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'User',
        },
        subject: {  
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
        },
        starred: {
            type: Boolean,
            default: false,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        replies: {
            type:[mongoose.Schema.Types.ObjectId],
            default: [],
            ref: 'ReplyEmail',
        },
        files: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'File',
        },
        photos: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'File',
        }
    },
);

 const email = mongoose.model("Email", emailSchema);

module.exports = email;