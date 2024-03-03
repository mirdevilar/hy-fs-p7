import { useState, useContext } from 'react'

import UserContext from '../contexts/UserContext'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const { user } = useContext(UserContext)
  const [displayDetails, setDisplayDetails] = useState(false)

  const toggleDetails = () => {
    setDisplayDetails(!displayDetails)
  }

  const getDisplayDetails = () => {
    return displayDetails ?
      'hide' :
      'show'
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
      <button name={displayDetails ? 'hide' : 'show'} data-testid="toggle-details" onClick={toggleDetails}>{displayDetails ? 'hide' : 'show'}</button>
      {displayDetails &&
        <div>
          <p data-testid="likes"> Likes: {blog.likes}
            <button aria-label="like" disabled={!user} onClick={handleLike}>Like</button>
          </p>
          <p>Uploaded by {blog.user.username}</p>
          {user && blog.user.username === user.username && <button name="delete" onClick={handleDelete}>Delete</button>}
        </div>
      }
    </div>
  )
}

export default Blog
