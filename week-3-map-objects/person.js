module.exports = class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    attend(meetup) {
        meetup.attendees.push(this)
    }

    static create({ name, age }) {
        return new Person(name, age)
    }
}
