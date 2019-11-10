const express = require('express')
const bodyParser = require('body-parser')

const personRouter = require('./routes/person')
const meetupRouter = require('./routes/meetup')

const app = express()

app.set('view engine', 'pug')
app.use(bodyParser.json())

app.use('/person', personRouter)
app.use('/meetup', meetupRouter)

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(3000, () => {
  console.log('Server listening')
})
