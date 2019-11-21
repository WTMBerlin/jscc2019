import test from 'ava'
import request from 'supertest'
import app from '../app'

test('Create new person', async t => {
  t.plan(3)
  const personToCreate = {
    name: 'Armagan Amcalar',
    age: 34,
    meetups: []
  }

  const res = await request(app)
    .post('/person')
    .send(personToCreate)

  // checking for server response status success
  t.is(res.status, 200)

  // comparing the created person's data
  t.is(res.body.name, personToCreate.name)
  t.is(res.body.age, personToCreate.age)
})

test('Fetch a person', async t => {
  t.plan(3)
  const personToCreate = {
    name: 'Maria Ovsyannikova',
    age: 25,
    meetups: []
  }

  // first create a person
  const mariaUserCreated = (await request(app)
    .post('/person')
    .send(personToCreate)).body

  // fetch the person we just created
  const fetchRes = await request(app).get(`/person/${mariaUserCreated._id}`)
  // checking for server response status success
  // this endpoint is rendering into HTML
  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/person/${mariaUserCreated._id}/json`)
  // checking for server response status success
  t.is(fetchResJson.status, 200)

  // this endpoint is responding with the user detail JSON data
  // compare the fetched user with created user
  const mariaUserFetched = fetchResJson.body
  t.deepEqual(mariaUserFetched, mariaUserCreated)
})

test('Delete a person', async t => {
  t.plan(4)

  // first create a person
  const personToCreate = { name: 'Celia Gomez', age: 33, meetups: [] }
  const celiaUserCreated = (await request(app)
    .post('/person')
    .send(personToCreate)).body

  // delete the person
  const deleteRes = await request(app).delete(`/person/${celiaUserCreated._id}`)
  // checking for server response status success
  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  // trying to render the detail page for the deleted user
  const fetch = await request(app).get(`/person/${celiaUserCreated._id}`)
  // checking for server response status - page not found 404
  t.is(fetch.status, 404)

  // trying to fetch the JSON data of the deleted user
  const fetchJson = await request(app).get(`/person/${celiaUserCreated._id}/json`)
  // checking for server response status - page not found 404
  t.is(fetchJson.status, 404)
})

test('Get list of people', async t => {
  t.plan(4)

  // first create a person to ensure that
  // there will be at least 1 user in people's list
  const personToCreate = { name: 'Omur Turan', age: 30, meetups: [] }
  const _ = await request(app)
    .post('/person')
    .send(personToCreate)

  // get the list of people - render view
  const res = await request(app).get('/person/all')
  // checking for server response status success
  t.is(res.status, 200)

  // get the list of people - JSON
  const jsonRes = await request(app).get('/person/all/json')
  // checking for server response status success
  t.is(jsonRes.status, 200)

  // check the response whether it is an array
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  // check the response whether at least there is 1 element
  t.true(jsonRes.body.length > 0)
})


test('User can attend to a meetup', async t => {
  const annaUser = { name: 'Anna Pavlova', age: 29, meetups: [] }

  const meetupWTM = { name: 'WTM Testing',
  location: 'Eurostaff',
  attendees: []}

  // create a person
  const createdPerson = (await request(app)
  .post('/person')
  .send(annaUser)).body

  // create a meetup
  const createdMeetup = (await request(app)
  .post('/meetup')
  .send(meetupWTM)).body

  // attend to the meetup with the user
  const addMeetupRes = await request(app)
  .post(`/person/${createdPerson._id}/meetups`)
  .send( {meetup: createdMeetup._id} )

  // check the server response success
  t.is(addMeetupRes.status, 200)

  // response body is the altered data of the user
  const personAltered = addMeetupRes.body

  // check that user has that meetup on their meetups
  t.is(personAltered.meetups[0]._id, createdMeetup._id)

  // check that user's meetup is the meetup we created
  t.deepEqual(personAltered.meetups[0], createdMeetup)

  // personAltered is not the same with the first created user
  // createdPerson had no meetups
  // personAltered has the meetup amongst their list of meetups
  t.notDeepEqual(personAltered, createdPerson)
})
