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
const post_note = (req, res) => {
    const deets = {
        author: "michael",
        pin: false
       
    };

    const newNote = {
        ...req.body,
        ...deets
    }

    const note = new Note(newNote)
    note.save().then((result) => {
        res.redirect('/')
    }).catch((err) => {
        console.log(err)
    })
    
}

const delete_note = (req, res) => {
    const id = req.params.id;
    Note.findByIdAndDelete(id)
    .then((result) => {
        res.json({redirect: '/notes'})
        
    }).catch((err) => {
        console.log(err)
    })
    
}

const pin_note = (req, res) => {
    const id = req.params.id

    Note.findByIdAndUpdate(id, {pin: true})
    .then((result) => {
        res.json({redirect: '/notes'})
    })
    .catch((err) => console.log(err))
}

module.exports = {
    allnotes,
    getsingle_note,
    addnew_note,
    post_note,
    delete_note,
    pin_note
    
}

