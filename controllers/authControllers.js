const User  = require("../models/authModel");
const jwt = require('jsonwebtoken')

const handleErrors = (error) => {
    console.log(error.message, error.code)

    const errors = {fname: "", lname: "", email: "", password: ""}

    if(error.message === 'invalid email') {
      errors.email = 'Email not registered to an account'
    }
    if(error.message === 'invalid password') {
      errors.password = 'Incorrect Password'
    }

    if(error.code === 11000) {
        errors.email = "Email already registered to an account"
        return errors;
    }

    if(error.message.includes('Users validation failed')){
       const vals = Object.values(error.errors)
       vals.forEach(({properties}) => {
            errors[properties.path] = properties.message
       });
    }

    return(errors)
}

// create jwt signature token
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWTSECRET, { expiresIn: maxAge })
}


// Auth controllers

  
const postLogin = async (req, res) => {
  const {email, password} = req.body

  try{
    const user = await User.login(email, password)
    const signedToken = createToken(user._id)
    res.cookie("jwt", signedToken, { httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: user._id});
 
  }catch (error){
    const errors = handleErrors(error)
    console.log(errors)
    res.status(400).json({errors});
  }
};



const postSignup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const result = await User.create({ fname, lname, email, password });
    const signedToken = createToken(result._id)
    res.cookie("jwt", signedToken, { httpOnly: true, maxAge: maxAge * 1000})
    res.status(201).json({user: result});
    
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json({errors});
  }
};

module.exports = { postLogin, postSignup };
