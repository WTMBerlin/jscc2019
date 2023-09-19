import {promises as fsp} from 'fs'
import Flatted from 'flatted'

const Service = class {
	constructor(model, dbPath) {
		this.model = model
		this.dbPath = dbPath
	}


	async findAll() {
		try{
			const file = await fsp.readFile(this.dbPath, 'utf8');
			const items = Flatted.parse(file).map(this.model.create)
			return items
		}catch(err){
			if(err.code == 'ENOENT') {
				await this.saveAll([])
				return([])
			}
			console.log(err)
			return err
		}
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

	async	del(itemId) {
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
		try{
			return await fsp.writeFile(this.dbPath, Flatted.stringify(items))
		}catch(err){
			return err
		}
	}
}

export default Service