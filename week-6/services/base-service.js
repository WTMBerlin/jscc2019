module.exports = class Service {
  async findAll() {
    return this.model.find()
  }

  async add(item) {
    return this.model.create(item)
  }

  async  del(itemId) {
    return this.model.remove({ _id: itemId })
  }

  async find(itemId) {
    return this.model.findById(itemId)
  }
}
