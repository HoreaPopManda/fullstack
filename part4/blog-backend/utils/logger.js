const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params) // writes at the terminal, same place where console.log() writes
}

module.exports = { info, error }