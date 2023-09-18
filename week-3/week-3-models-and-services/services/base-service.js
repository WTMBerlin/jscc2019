import fs from 'fs'
import Flatted from 'flatted'

const Service = class {
  constructor(model, dbPath) {
    this.model = model
    this.dbPath = dbPath
  }


  async findAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.dbPath, 'utf8', async (err, file) => {
        if (err) {
          if (err.code == 'ENOENT') {
            await this.saveAll([])
            return resolve([])
          }

          return reject(err)
        }

        const items = Flatted.parse(file).map(this.model.create)

        resolve(items)
      })
    })
  }

  async add(item) {
    const allItems = await this.findAll()
    const lastItem = allItems[allItems.length - 1]
    const lastItemsId = lastItem && lastItem.id || 0
    item.id = lastItemsId + 1

    allItems.push(item)

    await this.saveAll(allItems)

    return item
  }

  async  del(itemId) {
    const allItems = await this.findAll()
    const itemIndex = allItems.findIndex(p => p.id == itemId)
    if (itemIndex < 0) return

    allItems.splice(itemIndex, 1)

    await this.saveAll(allItems)
  }

  async find(itemId = 1) {
    const allItems = await this.findAll()

    return allItems.find(p => p.id == itemId)
  }

  async saveAll(items) {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.dbPath, Flatted.stringify(items), (err, file) => {
        if (err) return reject(err)

        resolve()
      })
    })
  }
}

export default Service