const express = require('express')
const router = express.Router()

const PersonService = require('../services/person-service')
const MeetupService = require('../services/meetup-service')

router.get('/all', async (req, res) => {
  const people = await PersonService.findAll()
  res.render('list', { items: people })
})

router.get('/:id', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  res.render('data', { data: user })
})

router.post('/', async (req, res) => {
  const user = await PersonService.add(req.body)
  res.send(user)
})

router.delete('/:id', async (req, res) => {
  const user = await PersonService.del(req.params.id)
  res.send(user)
})

router.post('/:id/meetups', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  const meetup = await MeetupService.find(req.body.meetup)
  await PersonService.attendMeetup(user, meetup)

  res.send(user)
})

router.get('/:id/peers-over-18', async (req, res) => {
  const user = await PersonService.find(req.params.id)
  const peers = await user.findPeersOver18()
  res.send(peers)
})

module.exports = router
