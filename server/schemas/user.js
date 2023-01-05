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
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    },
    {timestamps: true}
);

 const user = mongoose.model("User", userSchema);

module.exports = user;