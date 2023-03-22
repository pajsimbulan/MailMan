const mongoose = require('mongoose');

const replyEmailSchema = new mongoose.Schema(
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
        contents: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
    },
);

 const replyEmail = mongoose.model("ReplyEmail", replyEmailSchema);

 module.exports = replyEmail;