module.exports = class Person {
    constructor(name, age, meetups = [], id) {
        this.name = name
        this.age = age
        this.meetups = meetups
        this.id = id
    }

    attend(meetup) {
        this.meetups.push(meetup)
        meetup.attendees.push(this)
    }

    static create({ name, age, meetups, id }) {
        return new Person(name, age, meetups, id);
    }
}
