const Person = require('./person')
const Meetup = require('./meetup')
const Database = require('./database')

const loadedFile = Database.load()
const meetup = Meetup.create(loadedFile)
const wayfairMeetup = new Meetup('Wayfair', 'Location')
meetup.report()

wayfairMeetup.report()
