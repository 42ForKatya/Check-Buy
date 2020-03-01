const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dbUser:dbPass@cluster0-jogr3.mongodb.net/grocery-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
