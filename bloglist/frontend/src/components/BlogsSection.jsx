import { useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

import NotificationContext from '../contexts/NotificationContext'

const BlogsSection = ({ user }) => {
  const queryClient = useQueryClient()
  const { notify } = useContext(NotificationContext)
  const createFormRef = useRef()

  const { data: blogs, ...query } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsService.getAll,
  })

  const { mutate: createBlog } = useMutation({
    mutationFn: (blog) => blogsService.create(blog, user.token),
    onSuccess: (blog) => {
      console.log(blog)
      queryClient.setQueryData(['blogs'], blogs.concat(blog))
      createFormRef.current.toggleDisplay()
      notify(`${blog.title} by ${blog.author} added!`, 'green')
    },
    onError: (error) => {
      notify('Blog could not be created!', 'red')
    },
  })

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
      notify(`Deleted blog ${blog.title}!`, 'green')
    },
    onError: () => {
      notify('Blog could not be deleted!', 'red')
    }
  })

  // const updateBlog = async (blog) => {
  //   const blogsCopy = blogs
  //   try {
  //     setBlogs(blogsCopy.map(b => b.id !== blog.id ? b : blog))
  //     const updatedBlog = await blogsService.update({ ...blog, user: blog.user.id }, user.token)
  //   } catch (error) {
  //     setBlogs(blogsCopy)
  //     notify(error.response.data.error, 'red')
  //   }
  // }

  // const deleteBlog = async (blog) => {
  //   const blogsCopy = blogs
  //   try {
  //     setBlogs(blogsCopy.filter(b => b.id !== blog.id))
  //     await blogsService.remove(blog.id, user.token)
  //     notify(`Deleted blog ${blog.title}!`, 'green')
  //   } catch (error) {
  //     setBlogs(blogsCopy)
  //     notify(error.response.data.error, 'red')
  //   }
  // }

  if (query.isLoading) {
    return <p>loading...</p>
  }

  if (query.isError) {
    return <p>loading failed</p>
  }

  console.log(blogs)

  return (
    <section>
      <h2><i>Blogs</i></h2>
      {user &&
        <>
          <Toggleable showLabel='+ New' hideLabel="Cancel" ref={createFormRef}>
            <CreateForm
              blogs={blogs}
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
