const Database = require('./database')
const Meetup = require('./meetup')
const Person = require('./person')

const stuffToDoAfterLoadingTheDatabase = (err, loadedFile) => {
  if (err) {
    console.log('Hey, an error occured', err)
    return
  }
  console.log('hello!')

  const wtmb = Meetup.create(loadedFile)
  const omur = new Person('Omur', 30)
  omur.attend(wtmb)
  wtmb.printAttendeeNames()
  console.log(wtmb.name)
}

Database.load('meetup.json', stuffToDoAfterLoadingTheDatabase)
console.log('am i the last operation?')
