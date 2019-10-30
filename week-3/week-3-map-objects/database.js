const fs = require('fs')
module.exports = {
    save(data) {
        fs.writeFileSync('data.json', JSON.stringify(data))
    },
    load() {
        return JSON.parse(fs.readFileSync('data.json'))
    }
}
