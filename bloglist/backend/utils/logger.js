const info = (...params) => {
  if (process.env.NODE_ENV !== 'tesat') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}
module.exports = {
  info, error
}
