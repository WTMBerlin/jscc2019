console.log('1')

setTimeout(() => {
  console.log('2')
  console.log('5')
}, 10000)

console.log('3')
console.log('4')
console.log('6')

setTimeout(() => {
  console.log('7')
}, 7000)

setTimeout(() => {
  console.log('0')
}, 3000)


process.on('SIGINT', () => {
  console.log('i need to exit gracefully!')
})
