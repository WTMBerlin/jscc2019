import BaseService from './base-service.js'
import PersonModel from '../models/person.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class PersonService extends BaseService {
    constructor() {
        super(PersonModel, `${__dirname}/../person-database.json`)
    }
}

export default new PersonService()
