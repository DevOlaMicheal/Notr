const { User } = require("../models/noteModel");


const handleErrors = (error) => {
    console.log(error.message)

    if(error.message.includes('Users validation failed')){
        console.log(Object.values(error.errors))
    }
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
    handleErrors(error)
    // res.status(400).send(error.message);
  }
};

module.exports = { getLoginPage, getSignUpPage, postLogin, postSignup };
