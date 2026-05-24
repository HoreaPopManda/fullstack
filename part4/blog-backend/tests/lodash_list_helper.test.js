const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/lodash_list_helper')

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
    _id: intToObjectId(6),
    title: 'S-o invat pe Ana Maria',
    author: 'Torente',
    url: 'https://amr.com/asif',
    likes: 3,
    __v: 0
  },
]

describe('lodash tests', () => {

  test('the most cumulated likes ', () => {
    const result = listHelper.mostLikes(listWithMultipleBlogs)
    assert.strictEqual(result.author, 'Floriana')
  })

  test('the most blogs ', () => {
    const result = listHelper.mostBlogs(listWithMultipleBlogs)
    assert.strictEqual(result.blogs, 3)
    assert.strictEqual(result.author, 'Torente')
  })

})

