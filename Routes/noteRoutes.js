const express = require('express')
const notrconts = require('../controllers/notrcontrollers')
const router = express.Router()

router.get('/notes', notrconts.allnotes)
router.get('/notes/:id', notrconts.getsingle_note)

module.exports = router