//import { notes } from './index.js';
const notes = require('./indexOriginal.js')

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb+srv://horeapopmanda_db_user:${password}@cluster0.7jkvtae.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)


async function saveNotes() {
    for (const n of notes) {
        console.log(`Adding note: ${n.content}`);
        const oneNote = new Note(n);
        
        // Wait for this save to finish before moving to the next item
        await oneNote.save();
        console.log('note saved!');
    }

    // Now that the loop is completely finished, close the connection
    mongoose.connection.close();
    console.log('All notes saved and connection closed.');
}

saveNotes();