const fs = require('fs')

const save = function(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data))
}

const load = function(filename) {
  return JSON.parse(fs.readFileSync(filename, 'utf8'))
}

module.exports = { save, load }
