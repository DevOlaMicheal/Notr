const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const Note = require('./models/noteModel')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(process.env.PORT, () => console.log(`app running on port ${process.env.PORT}`))
}).catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.static("node_modules"))

app.get('/', (req, res) => {
    res.render('index', { title: "notr" })

})
app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
})
