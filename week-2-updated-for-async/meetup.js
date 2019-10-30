const Chalk = require('chalk')

module.exports = class Meetup {
  constructor(name, attendees = []) {
    this.name = name
    this.attendees = attendees
  }
  printAttendeeNames() {
    this.attendees.forEach(printName)
  }

  static create({ name, attendees }) {
    return new Meetup(name, attendees)
  }
}

const printName = person => console.log(Chalk.bgRed(person.name))
