const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    meetups: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Meetup',
        autopopulate: {
            maxDepth: 1
        }
    }]
})

PersonSchema.methods.findPeersOver18 = function (cb) {
    return PersonModel.find({
        age: {
            $gte: 18
        }
    });
};

PersonSchema.plugin(require('mongoose-autopopulate'))

const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
