const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const noteRoutes = require('./Routes/noteRoutes')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const User = require('./models/authModel')

mongoose.connect(process.env.MONGO_ATLAS).then((result) => {
    app.listen(process.env.PORT, () => console.log(`app running on port ${process.env.PORT}`))
}).catch(err => console.log(err))


app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(express.static("node_modules"))
app.use(express.urlencoded({ extended: true}));
app.use(express.json())
app.use(cookieParser())




app.get('/signup', (req, res) => {
    res.render('signup', { title: "SignUp" })
})
app.get('/signin', (req, res) => {
    res.render('login', { title: "Sign In" })
})

app.get('/logout', (req,res) => {
    res.cookie("jwt", "", {maxAge: 1})
    res.redirect('/signin')
})
// middleware to verify jwt token in cookie

app.get('*', (req, res, next) => { 
    const token = req.cookies.jwt
    if(token){
        // console.log(token)
        // next()
        jwt.verify(token, process.env.JWTSECRET, async (err, decodedToken) => {

            if(err){
                console.log(err.message)
                res.redirect('/signin')
            }else{
                const id = decodedToken.id
                const userDeets = await User.findById(id)
                res.locals.user = userDeets
                next()
            
            }
        })
    }else{
        console.log("Signed out")
        res.redirect('/signin')
    }
})




app.get('/', (req, res) =>  {
    res.redirect('/notes')
  })

app.get('/about', (req, res) => {
    res.render('about', { title: "about" })
})


app.use(noteRoutes)

app.use((req, res) => {
    res.redirect('/notes')
})


