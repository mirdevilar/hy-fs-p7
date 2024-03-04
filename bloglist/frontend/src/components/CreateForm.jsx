import { useState, useContext, useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'

import BlogsContext from '../contexts/BlogsContext'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

import blogsService from '../services/blogsService'

const CreateForm = ({ close }) => {
  // init required hooks
  const queryClient = useQueryClient()

  // use global states
  const { blogs } = useContext(BlogsContext)
  const { notify } = useContext(NotificationContext)
  const { user } = useContext(UserContext)

  // blog creation state manager
  const { mutate: createBlog } = useMutation({
    mutationFn: async (blog) => {
      const createdBlog = await blogsService.create(blog, user.token)
      return createdBlog
    },
    onSuccess: (blog) => {
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      close()
      notify(`${blog.title} by ${blog.author} added!`, 'green')
    },
    onError: (error) => {
      notify('Blog could not be created!', 'red')
    },
  })

  // form fields
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // create handler
  const handleCreate = (e) => {
    e.preventDefault()

    createBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  //

  return (
    <section>
      <form onSubmit={handleCreate}>
        <label htmlFor="title">title: </label>
        <input
          type='text'
          value={title}
          aria-label="title"
          onChange={({ target }) => setTitle(target.value)}
        /><br />
        <label htmlFor="author">author: </label>
        <input
          type='text'
          value={author}
          aria-label="author"
          onChange={({ target }) => setAuthor(target.value)}
        /><br />
        <label htmlFor="url">url: </label>
        <input
          type='url'
          value={url}
          aria-label='url'
          onChange={({ target }) => setUrl(target.value)}
        /><br />
        <button type="submit">submit {'>'}</button>
      </form>
    </section>
  )
}

export default CreateForm
