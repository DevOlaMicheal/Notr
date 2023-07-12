
const allnotes = (req, res) => {
    Note.find().then((result) => {
        res.render('dashboard/dashboard', { user: "John", title: 'All notes', notes: result })
    }).catch((err) => {
        console.log(err)
    })
}

