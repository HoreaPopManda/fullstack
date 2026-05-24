const dummy = (blogs) => {
  // ...
  console.log(blogs.length)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  //reduce (value to return, array to go through
  return blogs.reduce((favorite, blog) => {
    return (blog.likes > favorite.likes) ? blog : favorite
  })
}

const leastFavoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  //reduce (value to return, array to go through
  return blogs.reduce((leastFavorite, blog) => {
    return (blog.likes < leastFavorite.likes) ? blog : leastFavorite
  })
}

const orderByLikes = (blogs) => {
  return blogs.sort((a, b) => b.likes - a.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  leastFavoriteBlog,
  orderByLikes
}