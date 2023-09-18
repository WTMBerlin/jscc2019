import Person from './models/person.js'
import Meetup from './models/meetup.js'
import PersonService from './services/person-service.js'
import MeetupService from './services/meetup-service.js'

console.log('Hello World!')
console.log('Hello World!')

async function main() {
  const mert = new Person('Mert', 33)
  const armagan = new Person('Armagan', 34)

  const wtmb = new Meetup('Women Tech Makers Berlin', 'Eurostaff')
  armagan.attend(wtmb)
  mert.attend(wtmb)
  wtmb.report()

  await PersonService.add(mert)
  await PersonService.add(armagan)

  const people = await PersonService.findAll()

  console.log(people[0].name)

  await PersonService.del(1)

  const newPeople = await PersonService.findAll()
  
  console.log(newPeople[0].name)
}

main()
