const chalk = require('chalk')

module.exports = class Meetup {
    constructor(name, location, attendees = [], id) {
        this.name = name
        this.location = location
        this.attendees = attendees
        this.id = id
    }

    report() {
        console.log(chalk.blue.bgRed.bold(this.name), 'meetup is held at', chalk.green(this.location), 'and number of attendees are', this.attendees.length)
    }

    static create({ name, location, attendees, id }) {
        return new Meetup(name, location, attendees, id)
    }
}
