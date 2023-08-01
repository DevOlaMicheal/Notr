const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    author: {
        type: String,
        required: true,
        lowercase: true
    },
    body: {
        type: String,
        required: true,
        lowercase: true
    },
    pin: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })


const Note = mongoose.model('Note', notesSchema);

module.exports = Note