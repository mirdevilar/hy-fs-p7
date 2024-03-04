import { useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import BlogsContext from '../contexts/BlogsContext'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

import blogsService from '../services/blogsService'

const BlogsSection = () => {
  // use states and managers
  const { user } = useContext(UserContext)
  const { query, blogs, createBlog, updateBlog, deleteBlog } = useContext(BlogsContext)

  // init ref for form display toggling
  const createFormRef = useRef()

  // close event handler
  const closeForm = () => {
    createFormRef.current.toggleDisplay()
  }

  // keep under hooks!

  if (query.isLoading) {
    return <p>loading...</p>
  }

  if (query.isError) {
    return <p>loading failed</p>
  }

  //

  return (
    <section>
      <h2>Blogs</h2>
      {user &&
        <Toggleable
          showLabel='+ new'
          hideLabel="x cancel"
          disable={!user}
          ref={createFormRef}
        >
          <CreateForm close={closeForm} />
        </Toggleable>
      }
      <br />
      <ul>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(b =>
            <li key={b.id}>
              <Link to={`/blogs/${b.id}`}>{b.title}</Link> by {b.author}
            </li>
          )
        }
      </ul>
    </section>
  )
}

export default BlogsSection
