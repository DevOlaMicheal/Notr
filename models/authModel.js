
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    fname: {
        type: String,
        required: [true, "firstname is required"]
    },
    lname: {
        type: String,
        required: [true, "lastname is required"]
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        

    },
    password: {
        type: String,
        required: [true,"password is required"],
        minlength: [6, "password is too short, try six characters or more"]
    }


}, {
    timestamps: true
});


userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    console.log(this.password)
    next()
})

userSchema.statics.login = async function (email, password){
    const user = await this.findOne({email})
    // console.log(user)
    if(user) {
        const passwordAuth = await bcrypt.compare(password, user.password)
        if(passwordAuth){
            return user
        }throw Error("invalid password")
    }throw Error("invalid email")
}

module.exports = mongoose.model('Users', userSchema);
