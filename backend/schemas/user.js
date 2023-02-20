const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 100,
        },
        lastName: {
            type: String,
            required: false,
            min: 3,
            max: 100,
            default: '',
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        gender: {
            type: String,
            required: false,
            default: '',
        },
        password: { 
            type: String,
            required: true,
        },
        birthDate: {
            type: Date,
            required: false,
            default: () => new Date(1900,0,1),
        },
        avatarUrl: {
            type: String,
            required: false,
            default: '',
        },
        createdAt: {
            type: Date,
            immutable: true,
            default: () => Date.now(),
        },
        updatedAt: {
            type: Date,
            default: () => Date.now(),
        }
    },
);

const user = mongoose.model("User", userSchema);

module.exports = user;