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



test('get single blog and test it has the id', async () => {
  await api
    .get('/api/blogs/000000000000000000000001')
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(res => { assert.strictEqual(res.body.title, 'FBI')})
    .expect(res => { assert.ok(res.body.id) })
})



test('add and delete right after', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://example.com/test',
    likes: 0
  }

  const resWithID = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // trace (resWithID.body)

  const id = resWithID.body.id

  await api
    .put(`/api/blogs/${id}`)
    .send({ ...newBlog, title: 'Updated Test Blog' })
    .expect(200)

  await api
    .get(`/api/blogs/${id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(res => { assert.strictEqual(res.body.title, 'Updated Test Blog')})

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

})


test.only('test likes defaults to 0 ', async () => {
  const newBlog = {
    title: 'Test Zero likes',
    author: 'Test Author',
    url: 'https://example.com/testZeroLikes',
  }

  const resWithID = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  // trace (resWithID.body)

  const id = resWithID.body.id

  assert.strictEqual(resWithID.body.likes, 0)

  await api
    .delete(`/api/blogs/${id}`)
    .expect(204)

})


test('test missing data ', async () => {
  const newBlogNoTitle = {
    author: 'Test Author',
    url: 'https://example.com/testZeroLikes',
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoTitle)
    .expect(400)


  const newBlogNoUrl = {
    title: 'Test Blog',
    author: 'Test Author',
  }

  await api
    .post('/api/blogs')
    .send(newBlogNoUrl)
    .expect(400)
})


after(async () => {
  await mongoose.connection.close()
})