const mongoose = require('mongoose')

const user = mongoose.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

module.exports = mongoose.model('User', user)