import test from 'ava'
import request from 'supertest'
const app = require('../index.js')

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
