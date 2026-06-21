const blue  = require('./helper').logColorBlue
const magenta  = require('./helper').logColorMagenta
const red  = require('./helper').logColorRed

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(blue, ...params)
  }
}

const traceTest = (...params) => {
  if (process.env.NODE_ENV === 'test') {
    console.log(magenta, ...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(red, ...params) // writes at the terminal, same place where console.log() writes
  }
}

module.exports = { info, traceTest, error }