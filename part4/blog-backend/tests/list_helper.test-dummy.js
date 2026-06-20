const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const { ObjectId } = require('mongodb')

function intToObjectId(num) {
  return new ObjectId(num.toString(16).padStart(24, '0'))
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
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
    title: 'Ambasadorul',
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
  }
]

describe('total likes', () => {

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test('when list is empty, equals zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test ('when list has multiple blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 22)
  })
})

describe('ordering', () => {
  test ('find worst', () => {
    const result = listHelper.leastFavoriteBlog(listWithMultipleBlogs)
    assert.deepStrictEqual(result, {
      _id: intToObjectId(3),
      title: 'UEFA',
      author: 'Blatter',
      url: 'https://sb.com/blatordinar',
      likes: 4,
      __v: 0
    })
  })

  test ('ordering the blog by likes', () => {
    const result = listHelper.orderByLikes(listWithMultipleBlogs)

    const randomIndex = Math.floor(Math.random() * (listWithMultipleBlogs.length - 1))
    console.log(`randomIndex: ${randomIndex}`)
    assert.ok(result[0].likes >= result[1].likes)
  })
})