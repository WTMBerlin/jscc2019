const BaseService = require('./base-service')
const MeetupModel = require('../models/meetup')

class MeetupService extends BaseService {
    model = MeetupModel
}

module.exports = new MeetupService()
