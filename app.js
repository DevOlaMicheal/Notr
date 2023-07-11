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


app.get('/add', (req, res) => {
    const note = new Note({
        title: "Excos Metting", author: "Me", body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dignissimos est dolore corrupti deserunt delectus similique quae iusto, voluptates accusantium?"
    })

    note.save().then(result => {
        res.send(result)
    }).catch(err => {
        console.log(err)
    })
})

app.get('/get-all', (req, res) =>  {
    Note.find().then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})

app.get('/single', (req, res) => {
    Note.findById('64ad7455c49d0119babecf18').then((result) => {
        res.send(result)
    }).catch((err) => {
        console.log(err)
    })
})