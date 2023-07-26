const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    pin: {
        type: Boolean,
        required: true
    },
}, { timestamps: true })


const userSchema = new Schema({
    fname: {
        type: String,
        required: [true, "firstname is required"]
    },
    lname: {
        type: String,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }



}, {
    timestamps: true
});
const Note = mongoose.model('Note', notesSchema);
const User = mongoose.model('Users', userSchema);

module.exports = {
    Note,
    User
}