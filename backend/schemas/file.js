const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    data: { 
        type: Buffer, 
        required: true 
    }
});

const file = mongoose.model("File", fileSchema);

module.exports = file;