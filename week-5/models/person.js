const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    name: String,
    age: Number
})

const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
