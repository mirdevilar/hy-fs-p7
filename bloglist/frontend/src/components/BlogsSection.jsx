import { useContext, useRef } from 'react'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

import NotificationContext from '../contexts/NotificationContext'

const BlogsSection = ({ blogs, setBlogs, user }) => {
  const { notify } = useContext(NotificationContext)

  const createFormRef = useRef()

  const createBlog = async (blog) => {
    try {
      const newBlog = await blogsService.create(blog, user.token)
      setBlogs(await blogsService.getAll())
      createFormRef.current.toggleDisplay()
      notify(`${newBlog.title} by ${newBlog.author} added!`, 'green')
    } catch (error) {
      notify(error.response.data.error, 'red')
    }
  }

  const updateBlog = async (blog) => {
    const blogsCopy = blogs
    try {
      setBlogs(blogsCopy.map(b => b.id !== blog.id ? b : blog))
      const updatedBlog = await blogsService.update({ ...blog, user: blog.user.id }, user.token)
    } catch (error) {
      setBlogs(blogsCopy)
      notify(error.response.data.error, 'red')
    }
  }

  const deleteBlog = async (blog) => {
    const blogsCopy = blogs
    try {
      setBlogs(blogsCopy.filter(b => b.id !== blog.id))
      await blogsService.remove(blog.id, user.token)
      notify(`Deleted blog ${blog.title}!`, 'green')
    } catch (error) {
      setBlogs(blogsCopy)
      notify(error.response.data.error, 'red')
    }
  }

  return (
    <section>
      <h2><i>Blogs</i></h2>
      {user &&
        <>
          <Toggleable showLabel='+ New' hideLabel="Cancel" ref={createFormRef}>
            <CreateForm
              blogs={blogs}
              setBlogs={setBlogs}
              token={user.token}
              notify={notify}
              createBlog={createBlog} />
          </Toggleable>
          <br />
        </>
      }
      <div>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(b => <Blog
            user={user}
            blog={b}
            key={b.id}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
          />)
        }
      </div>
    </section>
  )
}

export default BlogsSection
