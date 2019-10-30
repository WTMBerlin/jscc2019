const Person = require('./models/person')
const Meetup = require('./models/meetup')
const PersonService = require('./services/person-service')
const MeetupService = require('./services/meetup-service')

console.log('Hello World!')

async function main() {
  const mert = new Person('Mert', 34)
  const armagan = new Person('Armagan', 35)

  const wtmb = new Meetup('Women Techmakers Berlin', 'Wayfair')
  armagan.attend(wtmb)
  mert.attend(wtmb)
  wtmb.report()

  await PersonService.add(mert)
  await PersonService.add(armagan)
  const people = await PersonService.findAll()

  console.log(people)

  await MeetupService.add(wtmb)

  const meetup = await MeetupService.find();

  meetup.report()
}

main()
