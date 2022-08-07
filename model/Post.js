const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max:255
    },
    content: {
        type: String,
        required: true,
    },
    imagePath: {
        data: Buffer,
        contentType: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Post', postSchema)