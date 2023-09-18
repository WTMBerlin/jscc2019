import BaseService from './base-service.js'
import MeetupModel from '../models/meetup.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MeetupService extends BaseService {
    constructor() {
        super(MeetupModel, `${__dirname}/../meetup-database.json`)
    }
}

export default new MeetupService()