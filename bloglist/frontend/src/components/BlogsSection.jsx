import { useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

import BlogsContext from '../contexts/BlogsContext'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

const BlogsSection = () => {
  const { user } = useContext(UserContext)
  const { query, blogs, createBlog, updateBlog, deleteBlog } = useContext(BlogsContext)

  const createFormRef = useRef()

  const closeForm = () => {
    createFormRef.current.toggleDisplay()
  }

  if (query.isLoading) {
    return <p>loading...</p>
  }

  if (query.isError) {
    return <p>loading failed</p>
  }

  return (
    <section>
      <h2><i>Blogs</i></h2>
      <Toggleable
        showLabel='+ New'
        hideLabel="Cancel"
        disable={!user}
        ref={createFormRef}
      >
        {user &&
          <CreateForm
            blogs={blogs}
            token={user.token}
            createBlog={createBlog}
            close={closeForm}
          />
        }
      </Toggleable>
      <br />
      <ul>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          // .map(b => <Blog
          //   blog={b}
          //   key={b.id}
          //   updateBlog={updateBlog}
          //   deleteBlog={deleteBlog}
          // />)
          .map(b =>
            <li key={b.id}>
              <a href={b.url}>{b.title}</a> by {b.author}
            </li>
          )
          // add Link
        }
      </ul>
    </section>
  )
}

export default BlogsSection
