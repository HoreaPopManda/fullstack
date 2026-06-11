require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const COURSE_PART = 'Part 4.2: Testing the backend'
module.exports = { MONGODB_URI, PORT, COURSE_PART }