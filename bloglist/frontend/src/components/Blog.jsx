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
  const [commentField, setCommentField] = useState('')

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

  const { mutate: addComment } = useMutation({
    mutationFn: ({ id, comment }) => blogsService.createComment(id, comment),
    onSuccess: (comments, { id }) => {
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id === id
        ? { ...b, comments }
        : b
      ))
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

  const handleSubmitComment = (e) => {
    e.preventDefault()
    addComment({ id: blog.id, comment: commentField })
    setCommentField('')
  }

  //

  const blogStyle = {
    backgroundColor: '#dae2ec',
    marginTop: '10px',
    padding: '5px',
    width: '40%'
  }

  return (
    <div>
      <h2><a href={blog.url} >{blog.title}</a></h2>
      <h3>by {blog.author}</h3>
      <div>
        <p data-testid="likes"> likes: {blog.likes}
          {user && <button className="mx-2" aria-label="like" onClick={handleLike}>^ like</button>}
        </p>
        <p>uploaded by {blog.user.username}</p>
        {user && blog.user.username === user.username && <button name="delete" onClick={handleDelete}>x delete</button>}
        <h3>Comments</h3>
        <form onSubmit={handleSubmitComment}>
          <input value={commentField} onChange={({ target }) => setCommentField(target.value)} />
          <button type="submit">+ add</button>
        </form>
        <ul className="list-disc list-inside">
          {blog.comments.map((c, i) =>
            <li key={i}>{c}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Blog
