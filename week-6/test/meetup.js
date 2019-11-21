import test from 'ava'
import request from 'supertest'
import app from "../app"

test('Get list of meetups', async t => {
  t.plan(4)
  const meetupToCreate = {
    name: 'Testing Session',
    location: 'unu GmbH',
    attendees: []
  }

  const _ = await request(app)
    .post('/meetup')
    .send(meetupToCreate)

  const res = await request(app).get('/meetup/all')
  t.is(res.status, 200)

  const resJson = await request(app).get('/meetup/all/json')
  t.is(resJson.status, 200)
  t.true(Array.isArray(resJson.body), 'Body should be an array')
  t.true(resJson.body.length > 0)
})

test('Create new meetup', async t => {
  t.plan(4)
  const meetupToCreate = {
    name: 'Testing Session',
    location: 'unu GmbH',
    attendees: []
  }

  const res = await request(app)
    .post('/meetup')
    .send(meetupToCreate)

  t.is(res.status, 200)
  t.is(res.body.name, meetupToCreate.name)
  t.is(res.body.location, meetupToCreate.location)
  t.deepEqual(res.body.attendees, meetupToCreate.attendees)
})

test('Fetch a meetup', async t => {
  t.plan(3)
  const meetupToCreate = {
    name: 'Testing Session',
    location: 'unu GmbH',
    attendees: []
  }

  const meetupCreated = (await request(app)
    .post('/meetup')
    .send(meetupToCreate)).body

  const fetchRes = await request(app).get(`/meetup/${meetupCreated._id}`)
  t.is(fetchRes.status, 200)

  const fetchResJson = await request(app).get(`/meetup/${meetupCreated._id}/json`)

  const meetupFetched = fetchResJson.body

  t.is(fetchResJson.status, 200)
  t.deepEqual(meetupFetched, meetupCreated)
})

test('Delete a meetup', async t => {
  t.plan(4)

  const meetupToCreate = {
    name: 'Testing Session',
    location: 'unu GmbH',
    attendees: []
  }

  const meetup = (await request(app)
    .post('/meetup')
    .send(meetupToCreate)).body

  const deleteRes = await request(app).delete(`/meetup/${meetup._id}`)

  t.is(deleteRes.status, 200)
  t.is(deleteRes.ok, true)

  const fetchJson = await request(app).get(`/meetup/${meetup._id}/json`)
  t.is(fetchJson.status, 404)

  const fetch = await request(app).get(`/meetup/${meetup._id}`)
  t.is(fetch.status, 404)
})
