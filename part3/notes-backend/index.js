require('dotenv').config()
const express = require('express')
const Note = require('./models/note')

const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(express.static('dist'))

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
  return String(maxId + 1)
}

app.get('/', (request, response) => {
  response.send(`<h1>Notes API, fullstack course part 3b. Port ${PORT} !</h1>`)
})


//////// create a new note
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })

})

///////// update a note
app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  // { new: true } ensures the updated document is returned, not the old one
  Note.findByIdAndUpdate(request.params.id, note, { returnDocument: 'after' })
    .then(updatedNote => {
      if (updatedNote) {
        response.json(updatedNote)
      } else {
        response.status(404).end() // Handle case where ID doesn't exist in DB
      }
    })
    .catch(error => next(error))
})



//////// get the notes
app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note)
  })
})

//////// delete a note
app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id;
    Note.findByIdAndDelete(id).then(() => {
        response.status(204).end();
    });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

