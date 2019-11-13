const BaseService = require('./base-service')
const PersonModel = require('../models/person')

class PersonService extends BaseService {
    model = PersonModel

    async attendMeetup(person, meetup) {
        person.meetups.push(meetup)
        meetup.attendees.push(person)
        await person.save()
        await meetup.save()
    }
}

module.exports = new PersonService()
