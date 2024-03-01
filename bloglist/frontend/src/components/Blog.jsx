import { useState } from 'react'

const Blog = ({ user, blog, updateBlog, deleteBlog }) => {
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
    blog.likes += 1
    updateBlog(blog)
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
        <>
          <p data-testid="likes"> Likes: {blog.likes}<button aria-label="like" onClick={handleLike}>Like</button></p>
          <p>Uploaded by {blog.user.username}</p>
          {blog.user.username === user.username && <button name="delete" onClick={handleDelete}>Delete</button>}
        </>
      }
    </div>
  )
}

export default Blog