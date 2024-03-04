import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query'

import BlogsContext from '../contexts/BlogsContext'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

import blogsService from '../services/blogsService'

const Blog = ({ blog }) => {
  // use needed hooks
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  //-- STATE MANAGEMENT --//

  // use states
  const { blogs } = useContext(BlogsContext)
  const { notify } = useContext(NotificationContext)
  const { user } = useContext(UserContext)

  // MUTATIONS

  // update
  const { mutate: updateBlog } = useMutation({
    mutationFn: (blog) => blogsService.update({ ...blog }, user.token),
    onSuccess: (blog) => {
      queryClient.setQueryData(['blogs'], blogs.map((b) => b.id === blog.id ? blog : b))
    },
    onError: () => {
      notify('Vote could not be sent!', 'red')
    }
  })

  // delete
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

  //----//

  // keep under hooks!
  if (!blog) {
    return null
  }

  // EVENT HANDLERS

  const handleLike = () => {
    updateBlog({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete the blog?')) {
      deleteBlog(blog)
    }
  }

  //

  const blogStyle = {
    backgroundColor: '#dae2ec',
    marginTop: '10px',
    padding: '5px',
    width: '40%'
  }

  return (
    <div style={blogStyle}>
      <h3><a href={blog.url} >{blog.title}</a> by {blog.author}</h3>
      <div>
        <p data-testid="likes"> Likes: {blog.likes}
          <button aria-label="like" disabled={!user} onClick={handleLike}>Like</button>
        </p>
        <p>Uploaded by {blog.user.username}</p>
        {user && blog.user.username === user.username && <button name="delete" onClick={handleDelete}>Delete</button>}
        <h3>Comments</h3>
        <ul>
          {blog.comments.map((c, i) =>
            <li key={i}>{c}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
