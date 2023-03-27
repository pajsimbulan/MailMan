const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
            lowercase: true,
        },
        fromFirstName: {
            type: String,
            required: true,
            min: 3,
            max: 100,
        },
        to: {
            type: String,
            required: true,
            lowercase: true,
        },
        subject: {  
            type: String,
            required: true,
        },
        contents: {
            type: String,
            required: true,
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
        }
    },
);

 const email = mongoose.model("Email", emailSchema);

module.exports = email;