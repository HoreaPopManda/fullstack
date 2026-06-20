const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const info = require('../utils/logger').info
const trace = require('../utils/logger').trace


const api = supertest(app)

test('invalid blog API path', async () => {
  await api
    .get('/api/blog-invalid')
    .expect(404)
})


test('blogs are returned as json. expect 8 in the test db', async () => {
  trace('Testing blogs are returned as json and there are 8 blogs in the test db (this msg shows up before the prev test  is finished')
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(res => { assert.strictEqual(res.body.length, 8)})
})


after(async () => {
  await mongoose.connection.close()
})