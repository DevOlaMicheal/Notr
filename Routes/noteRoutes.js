const express = require('express')
const { allnotes, getsingle_note, addnew_note, post_note, delete_note, pin_note, unpin_note, handle_search, edit_note, update_note } = require('../controllers/notrcontrollers')
const router = express.Router()

router.get('/notes', allnotes)
router.get('/notes/:id', getsingle_note)
router.get('/new', addnew_note)
router.post('/', post_note)
router.post('/notes/update/:id', update_note)
router.delete('/notes/:id', delete_note)
router.patch('/notes/pin/:id', pin_note)
router.patch('/notes/unpin/:id', unpin_note)
router.get('/notes/edit/:id', edit_note)
router.post('/notes/search', handle_search)

module.exports = router