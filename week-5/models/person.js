const mongoose = require('mongoose')

const PersonSchema = mongoose.Schema({
    name: String,
    age: Number,
    meetups: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Meetup',
        autopopulate: true
    }
})

PersonSchema.plugin(require('mongoose-autopopulate'));

const PersonModel = mongoose.model('Person', PersonSchema)
module.exports = PersonModel
