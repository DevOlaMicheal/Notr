const err = {
    error: "user val failed",
    error2: "email wrong",
    password: "password worng",
    things: {
        name: "john"
    }
}

let errors = { error: "", error1: "", error2: "" }

// Object.values(err).forEach(errmsg => {
//     errors = errmsg 
//     console.log(errors)
// })

// console.log(Object.values(err))

err['] = "sam"


console.log(err)

// const name = [
//         {

//         title: "hello"
//     },

//     {
//         title: "hello"
//     },

//     {
//         title: "pikaso"
//     }

// ]

// const fil = name.filter(newname => {
//    return newname.title.includes('o')
// })


// fil.length > 0 ? fil.map(res => {console.log(res)}) : console.log('not')

// let john = '1'

// john.length == 0 ? console.log("accurate") : console.log("low")
