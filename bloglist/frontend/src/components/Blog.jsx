import { useState, useContext } from 'react'

import BlogsContext from '../contexts/BlogsContext'
import UserContext from '../contexts/UserContext'

const Blog = ({ blog }) => {

  const { blogs, updateBlog, deleteBlog } = useContext(BlogsContext)
  const { user } = useContext(UserContext)

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
