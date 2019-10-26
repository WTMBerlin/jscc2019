const Person = require('./person')
const Meetup = require('./meetup')
const Chalk = require('chalk')
const Database = require('./database')

const armagan = new Person("Armagan", 35)
const mert = new Person("Mert", 34)

const wtmb = new Meetup("Women Techmakers Berlin")

armagan.attend(wtmb)
mert.attend(wtmb)
wtmb.printAttendeeNames()

console.log(Chalk.blue.bgRed.bold(wtmb.name))

Database.save('meetup.json', wtmb)

const loadedFile = Database.load('meetup.json')
console.log(loadedFile.name)