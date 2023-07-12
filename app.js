const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(process.env.PORT, () => console.log(`app running on port ${process.env.PORT}`))
}).catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.static("node_modules"))



app.get('/', (req, res) =>  {
    res.redirect('/notes')
  })

app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
})

app.get('/notes', (req, res) => {
    Note.find().then((result) => {
        res.render('dashboard/dashboard', { user: "John", title: 'All notes', notes: result })
    }).catch((err) => {
        console.log(err)
    })
})
