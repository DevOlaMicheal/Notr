const { User } = require("../models/noteModel");


const handleErrors = (error) => {
    console.log(error.message, error.code)

    const errors = {fname: "", lname: "", email: "", password: ""}

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
// Auth controllers
const getLoginPage = (req, res) => {
  res.send("hi login page");
};

const getSignUpPage = (req, res) => {};

const postLogin = (req, res) => {
  res.send("hi login page");
};

const postSignup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  try {
    const result = await User.create({ fname, lname, email, password });
    res.status(201).json(result);
  } catch (error) {
    const errors = handleErrors(error)
    res.status(400).json(errors);
  }
};

module.exports = { getLoginPage, getSignUpPage, postLogin, postSignup };
