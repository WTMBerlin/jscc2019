const mongoose = require('mongoose')

async function main() {
  await mongoose.connect('mongodb://localhost/wtm', { useUnifiedTopology: true, useNewUrlParser: true})
  console.log('connected')
}

main()
