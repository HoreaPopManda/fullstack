const { test, before, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app) // supertest loads the app.js file and starts the server.
const blue  = require('../utils/helper').logColorBlue
const magenta  = require('../utils/helper').logColorMagenta


before(() => console.log(magenta, 'about to run some test. supertest loads the app.js file and starts the server.'))

/*
beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})
*/

beforeEach(async () => {
  console.log(magenta, 'before each test')
  await Note.deleteMany({})
  console.log(magenta, 'deleted')
  await Note.insertMany(helper.initialNotes)
  console.log(magenta, 'inserted')
})


test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200) // expect is possible because of supertest. supertest also loads the app.js file and starts the server. If the app.js file is not loaded, then the server is not started and the test will fail.
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned. expecting x notes', async () => {
  const response = await api.get('/api/notes')
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable response
  assert.strictEqual(response.body.length, helper.initialNotes.length)
})

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/api/notes')
  const contents = response.body.map(e => e.content)

  //console.log(blue, contents)

  assert(contents.includes('HTML is easy'), true)
})

test('a valid note can be added ', async () => {
  const newNote = {
    content: 'async/await simplifies making async calls',
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const notesAtEnd = await helper.notesInDb()
  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

  const contents = notesAtEnd.map(n => n.content)
  assert(contents.includes('async/await simplifies making async calls'))
})

test.only('note without content is not added', async () => {
  const newNote = {
    important: true
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(400)

  // expecting ValidationError: Note validation failed: content: Path `content` is required.
  const notesAtEnd = await helper.notesInDb()

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})


test('a specific note can be viewed', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToView = notesAtStart[0]


  const resultNote = await api
    .get(`/api/notes/${noteToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.deepStrictEqual(resultNote.body, noteToView)
})


test('a note can be deleted', async () => {
  const notesAtStart = await helper.notesInDb()
  const noteToDelete = notesAtStart[0]

  await api
    .delete(`/api/notes/${noteToDelete.id}`)
    .expect(204)

  const notesAtEnd = await helper.notesInDb()

  const ids = notesAtEnd.map(n => n.id)
  assert(!ids.includes(noteToDelete.id))

  assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1)
})


after(async () => {
  await mongoose.connection.close()
})