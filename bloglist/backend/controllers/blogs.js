const router = require('express').Router()
const Blog = require('../models/blog')

const { userExtractor } = require('../utils/middleware')

const userFields = {
  username: 1,
  name: 1,
}

router.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', userFields)

  response.json(blogs)
})

router.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = new Blog({
    title, author, url, 
    likes: likes ? likes : 0
  })

  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  blog.user = user._id

  const createdBlog = await blog.save()
  const id = createdBlog._id

  user.blogs = user.blogs.concat(id)
  await user.save()

  const populatedBlog = await Blog
    .findById(id)
    .populate('user', userFields)

  response.status(201).json(populatedBlog)
})

router.put('/:id', userExtractor, async (request, response) => {
  const { title, url, author, likes, user } = request.body

  const requestUser = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  const blog = await Blog
    .findById(request.params.id)
    .populate('user', userFields)

  if (requestUser.id !== blog.user) {
    blog.likes = likes
  } else {
    blog.title = title
    blog.url = url
    blog.author = author
    blog.likes = likes
  }

  savedBlog = await blog.save()
  console.log(savedBlog)
  response.json(savedBlog)
})

router.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.remove()
  
  response.status(204).end()
})

router.post('/:id/comments', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
  
  blog.comments.push(request.body.comment)

  const savedBlog = await blog.save()
  response.json(savedBlog.comments)
})

module.exports = router
