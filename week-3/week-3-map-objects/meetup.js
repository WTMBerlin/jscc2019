const Chalk = require('chalk')
const Person = require('./person')

module.exports = class Meetup {
    constructor(name, location, attendees = []) {
        this.name = name
        this.location = location
        this.attendees = attendees
    }

    report() {
        console.log(Chalk.blue.bgRed.bold(this.name), 'meetup is held at', Chalk.green(this.location), 'and number of attendees are', this.attendees.length)
    }

    static create({ name, location, attendees }) {
        const meetup = new Meetup(name, location, attendees)

        meetup.attendees = attendees.map(Person.create)

        return meetup
    }
}
