const mongoose = require('mongoose');

const draftEmailSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,    
            ref: 'User',
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
        files: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'File',
        }
    },
);

 const draftEmail = mongoose.model("DraftEmail", draftEmailSchema);

 module.exports = draftEmail;