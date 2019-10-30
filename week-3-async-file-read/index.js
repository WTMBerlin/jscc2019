const fs = require('fs')

/*

First version, synchronous

*/

const file1 = fs.readFileSync(__dirname + '/files/1.txt', 'utf8')
console.log(file1)

const file2 = fs.readFileSync(__dirname + '/files/2.txt', 'utf8')
console.log(file2)

const file3 = fs.readFileSync(__dirname + '/files/3.txt', 'utf8')
console.log(file3)

/*

Second version, asynchronous

*/

fs.readFile(__dirname + '/files/1.txt', 'utf8', (err, contents1) => {
    console.log(contents1)
    fs.readFile(__dirname + '/files/2.txt', 'utf8', (err, contents2) => {
        console.log(contents2)
        fs.readFile(__dirname + '/files/3.txt', 'utf8', (err, contents3) => {
            console.log(contents3)
        })
    })
})


/*

Third version, promises

*/

let readFile = (filename) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, 'utf8', (err, contents) => {
            if (err) return reject(err)

            resolve(contents)
        })
    })
}

readFile(__dirname + '/files/1.txt')
    .then(console.log)
    .then(() => readFile(__dirname + '/files/2.txt'))
    .then(console.log)
    .then(() => readFile(__dirname + '/files/3.txt'))
    .then(console.log)
    .catch(err => console.log(err))

/*

Fourth version, async / await

*/

async function main() {
    const contents1 = await readFile(__dirname + '/files/1.txt')
    console.log(contents1)

    const contents2 = await readFile(__dirname + '/files/2.txt')
    console.log(contents2)

    const contents3 = await readFile(__dirname + '/files/3.txt')
    console.log(contents3)
}

(async () => {
    try {
        await main()
    } catch (e) {
        console.log(e)
    }
})()
