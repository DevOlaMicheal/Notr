const Note = require('../models/noteModel')
const jwt = require('jsonwebtoken')

const allnotes = async(req, res) => {
    const token = req.cookies.jwt
    const decode = jwt.decode(token)
    const user = decode.id
    try{
        const notes = await Note.find({author: user}).sort({ createdAt: -1})
        console.log(notes)
        res.render('dashboard/dashboard', { title: 'All notes', notes, isSearch: false })

    }catch(err){
        res.status(400).json(err.message)
    }
   
    
    
 
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
    
    res.render('dashboard/addNew', { title: "new note", result: {title: '', body: '', id: ''}, type: 'post'})
}
const post_note = async (req, res) => {

    const { title, body } = req.body
    const token = req.cookies.jwt
    const decode = jwt.decode(token)
    const author = decode.id
    try{
        const note = await Note.create({title, body, author, pin: false})
        console.log(note)
        res.redirect('/')
    }catch(err){
        res.status(400).json(err)
    }
    
    
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

const unpin_note = (req, res) => {
    const id = req.params.id

    Note.findByIdAndUpdate(id, {pin: false})
    .then((result) => {
        res.json({redirect: '/notes'})
    })
    .catch((err) => console.log(err))
}

const edit_note = async (req, res) => {
    const id = req.params.id

    try {
        const re = await Note.findById(id)
        res.render('dashboard/addNew', {result: re, title: 'Edit Note', type: 'update'})
    }catch(err) {
        res.status(404).send(err)
    }

}

const update_note = async (req, res) => {

    const id = req.params.id

    try {
        await Note.findByIdAndUpdate(id, {title: req.body.title, body: req.body.body})
        res.redirect('/')
    } catch (error) {
        console.log(error);
    }
}

const handle_search = async (req, res) => {
    const searchchQuery = req.query.term
    const token = req.cookies.jwt
    const decode = jwt.decode(token)
    try {
        const search = await Note.find({author: decode.id})
        const searchresult = search.filter((sres) => {
             return sres.body.includes(searchchQuery) || sres.title.includes(searchchQuery)
        })
        res.render('dashboard/dashboard', {notes: searchresult, isSearch: true, title: "Search result"})
        
    }catch(error) {
        console.log(error.message)
    }

}


module.exports = {
    allnotes,
    getsingle_note,
    addnew_note,
    post_note,
    delete_note,
    pin_note,
    handle_search,
    unpin_note,
    edit_note,
    update_note,
    
}

