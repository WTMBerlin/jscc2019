const BaseService = require('./base-service')
const PersonModel = require('../models/person')

class PersonService extends BaseService {
    constructor() {
        super(PersonModel, `${__dirname}/../person-database.json`)
    }
}

module.exports = new PersonService()
