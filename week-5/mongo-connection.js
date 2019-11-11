const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/wtm', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected')
  })
