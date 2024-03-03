import { useState, useContext } from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import BlogsContext from '../contexts/BlogsContext'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

import blogsService from '../services/blogsService'

const Blog = ({ blog }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { blogs } = useContext(BlogsContext)
  const { notify } = useContext(NotificationContext)
  const { user } = useContext(UserContext)

  const { mutate: updateBlog } = useMutation({
    mutationFn: (blog) => blogsService.update({ ...blog }, user.token),
    onSuccess: (blog) => {
      queryClient.setQueryData(['blogs'], blogs.map((b) => b.id === blog.id ? blog : b))
    },
    onError: () => {
      notify('Vote could not be sent!', 'red')
    }
  })

  const { mutate: deleteBlog } = useMutation({
    mutationFn: (blog) => blogsService.remove(blog.id, user.token),
    onSuccess: (response, blog) => {
      queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))
      navigate('/')
      notify(`Deleted blog ${blog.title}!`, 'green')
    },
    onError: () => {
      notify('Blog could not be deleted!', 'red')
    }
  })

  if (!blog) {
    return null
  }

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      deleteBlog(blog)
    }
  }


  const blogStyle = {
    backgroundColor: '#dae2ec',
    marginTop: '10px',
    padding: '5px',
    width: '40%'
  }

  return (
    <div style={blogStyle}>
      <p><a href={blog.url} >{blog.title}</a> by {blog.author}</p>
      <div>
        <p data-testid="likes"> Likes: {blog.likes}
          <button aria-label="like" disabled={!user} onClick={handleLike}>Like</button>
        </p>
        <p>Uploaded by {blog.user.username}</p>
        {user && blog.user.username === user.username && <button name="delete" onClick={handleDelete}>Delete</button>}
      </div>
    </div>
  )
}

export default Blog
