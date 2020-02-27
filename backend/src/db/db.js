const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/grocery-db', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
})
