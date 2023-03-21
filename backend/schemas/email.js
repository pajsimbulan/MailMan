const mongoose = require('mongoose');
const replyEmailSchema = require('./replyEmail');

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
            type:[replyEmailSchema],
            default: [],
        }
    },
);

 const email = mongoose.model("Email", emailSchema);

module.exports = email;