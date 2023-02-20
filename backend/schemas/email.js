const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema(
    {
        from: {
            type: String,
            required: true,
            lowercase: true,
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
    },
);

 const email = mongoose.model("Email", emailSchema);

module.exports = email;