import test from 'ava'
import request from 'supertest'
import app from "../app"

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

  t.is(res.status, 200)
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

  const mariaUserCreated = (await request(app)
    .post('/person')
    .send(personToCreate)).body

  const fetchRes = await request(app).get(`/person/${mariaUserCreated._id}/json`)

  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/person/${mariaUserCreated._id}/json`)

  t.is(fetchResJson.status, 200)
  const mariaUserFetched = fetchResJson.body
  t.deepEqual(mariaUserFetched, mariaUserCreated)
})

test('Delete a person', async t => {
  t.plan(3)

  const personToCreate = { name: 'Celia Gomez', age: 33, meetups: [] }

  const celiaUserCreated = (await request(app)
    .post('/person')
    .send(personToCreate)).body

  const deleteRes = await request(app).delete(`/person/${celiaUserCreated._id}`)

  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  const fetch = await request(app).get(`/person/${celiaUserCreated._id}/json`)

  t.is(fetch.status, 404)
})

test('Get list of people', async t => {
  t.plan(4)
  const personToCreate = { name: 'Omur Turan', age: 30, meetups: [] }

  const _ = await request(app)
    .post('/person')
    .send(personToCreate)

  const res = await request(app).get('/person/all')
  t.is(res.status, 200)

  const jsonRes = await request(app).get('/person/all/json')
  t.is(jsonRes.status, 200)
  t.true(Array.isArray(jsonRes.body), 'Body should be an array')
  t.true(jsonRes.body.length > 0)
})
