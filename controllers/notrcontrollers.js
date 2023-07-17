const Note = require('../models/noteModel')

const allnotes = (req, res) => {
    Note.find().sort({ createdAt: -1})
    .then((result) => {
        res.render('dashboard/dashboard', { user: "John", title: 'All notes', notes: result })
    }).catch((err) => {
        console.log(err)
    })
}

const getsingle_note = (req, res) => {
    const id = req.params.id
    Note.findById(id)
    .then((result) => {
        res.render('dashboard/details', { title: result.title, notes: result })
    }).catch((err) => {
        console.log(err)
    })
}

const addnew_note = (req, res) => {
    res.render('dashboard/addNew', { title: "new note"})
}

module.exports = {
    allnotes,
    getsingle_note,
    addnew_note
    
}

