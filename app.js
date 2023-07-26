const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const noteRoutes = require('./Routes/noteRoutes')

mongoose.connect(process.env.MONGO_URI).then((result) => {
    app.listen(process.env.PORT, () => console.log(`app running on port ${process.env.PORT}`))
}).catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.static("node_modules"))
app.use(express.urlencoded({ extended: true}));
app.use(express.json())



app.get('/', (req, res) =>  {
    res.redirect('/notes')
  })
1
app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
})


app.use(noteRoutes)

app.use((req, res) => {
    res.redirect('/notes')
})


