const mongoose = require('mongoose')
module.exports = class Service {
  async find(id) {
    return this.model.findById(id)
  }

  async findAll() {
    return this.model.find()
  }

  async add(item) {
    return this.model.create(item)
  }

  async del(itemId) {
    return this.model.remove({ _id: itemId })
  }
}
