const mongoose = require('mongoose');

const replyEmailSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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

 const replyEmail = mongoose.model("ReplyEmail", replyEmailSchema);

 module.exports = replyEmail;