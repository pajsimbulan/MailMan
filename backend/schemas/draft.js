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
            lowercase: true,
        },
        subject: {  
            type: String,       
        },
        contents: {
            type: String,
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

 const draftEmail = mongoose.model("DraftEmail", draftEmailSchema);

 module.exports = draftEmail;