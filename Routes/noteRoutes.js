const express = require('express')
const { allnotes, getsingle_note, addnew_note, post_note } = require('../controllers/notrcontrollers')
const router = express.Router()

router.get('/notes', allnotes)
router.get('/notes/:id', getsingle_note)
router.get('/new', addnew_note)
router.post('/', post_note)
router.get('/notes/:id', )
module.exports = router