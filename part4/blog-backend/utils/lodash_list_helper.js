var _ = require('lodash')

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const groupOfBlogsByAuthor = _.groupBy(blogs, 'author')
  // console.log(groupOfBlogsByAuthor)
  const blogsByAuthor = _.mapValues(
    groupOfBlogsByAuthor,
    group => group.length
  )
  //console.log(blogsByAuthor)

  const authorWithMostBlogs = _.maxBy(_.keys(blogsByAuthor), author => blogsByAuthor[author])

  return {
    author: authorWithMostBlogs, blogs: blogsByAuthor[authorWithMostBlogs]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = _.mapValues(
    _.groupBy(blogs, 'author'),
    group => _.sumBy(group, 'likes')
  )

  console.log(likesByAuthor)
  const authorWithMostLikes = _.maxBy(_.keys(likesByAuthor), author => likesByAuthor[author])
  return {
    author: authorWithMostLikes, blogs: likesByAuthor[authorWithMostLikes]
  }
}

module.exports = {
  mostBlogs,
  mostLikes
}