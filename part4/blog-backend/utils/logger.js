const blue  = require('./helper').logColorBlue
const magenta  = require('./helper').logColorMagenta
const red  = require('./helper').logColorRed

const info = (...params) => {
  console.log(blue, ...params)
}

const trace = (...params) => {
  console.log(magenta, ...params)
}

const error = (...params) => {
  console.error(red, ...params) // writes at the terminal, same place where console.log() writes
}

module.exports = { info, trace, error }