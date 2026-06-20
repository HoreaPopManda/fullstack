const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const { ObjectId } = require('mongodb')

function intToObjectId(num) {
  return new ObjectId(num.toString(16).padStart(24, '0'))
}

const listWithMultipleBlogs = [
  {
    _id: intToObjectId(1),
    title: 'FBI',
    author: 'Mancuso',
    url: 'https://example.com/fbi',
    likes: 10,
    __v: 0
  },
  {
    _id: intToObjectId(2),
    title: 'Ambassador',
    author: 'Floriana',
    url: 'https://fj.com/bj',
    likes: 8,
    __v: 0
  },
  {
    _id: intToObjectId(3),
    title: 'UEFA',
    author: 'Blatter',
    url: 'https://sb.com/blatordinar',
    likes: 4,
    __v: 0
  },
  {
    _id: intToObjectId(4),
    title: 'Cezar and Oksane',
    author: 'Floriana',
    url: 'https://fj.com/bj2',
    likes: 5,
    __v: 0
  },
  {
    _id: intToObjectId(5),
    title: 'Noemi te intreaba',
    author: 'Torente',
    url: 'https://tr.com/bj',
    likes: 3,
    __v: 0
  },
  {
    _id: intToObjectId(6),
    title: 'Iolanda stie tot',
    author: 'Torente',
    url: 'https://tr.com/af',
    likes: 3,
    __v: 0
  },
  {
    _id: intToObjectId(7),
    title: 'Kolima tales',
    author: 'Varlam',
    url: 'https://vs.com/af',
    likes: 12,
    __v: 0
  },
  {
    _id: intToObjectId(8),
    title: 'S-o invat pe Ana Maria',
    author: 'Torente',
    url: 'https://amr.com/asif',
    likes: 3,
    __v: 0
  },
]
const mongoose = require('mongoose')

// const url = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.TEST_MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)


async function saveBlogs() {
  for (const b of listWithMultipleBlogs) {
    console.log(`Adding blog: ${b.title}`)
    const oneBlog = new Blog(b)

    // Wait for this save to finish before moving to the next item
    await oneBlog.save()
    console.log('blog saved!')
  }

  // Now that the loop is completely finished, close the connection
  mongoose.connection.close()
  console.log('All blogs saved and connection closed.')
}

saveBlogs()