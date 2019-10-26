const Chalk = require('chalk')

module.exports = class Meetup {
  constructor(name) {
    this.name = name
    this.attendees = []
  }
  printAttendeeNames() {
    this.attendees.forEach(printName)
  }
}

const printName = person => console.log(Chalk.bgGreen(person.name))