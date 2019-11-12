const BaseService = require('./base-service')
const PersonModel = require('../models/person')

class PersonService extends BaseService {
    model = PersonModel

    attendMeetup(person, meetup) {
        person.meetups.addToSet(meetup)
        person.save()
        meetup.attendees.addToSet(person)
        meetup.save()
    }
}

module.exports = new PersonService()
