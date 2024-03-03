import { useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import Blog from './Blog'
import CreateForm from './CreateForm'
import Toggleable from './Toggleable'

import blogsService from '../services/blogsService'

import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

const BlogsSection = () => {
  const queryClient = useQueryClient()
  const { notify } = useContext(NotificationContext)
  const { user } = useContext(UserContext)
  const createFormRef = useRef()

  const { data: blogs, ...query } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsService.getAll,
  })

  const { mutate: createBlog } = useMutation({
    mutationFn: (blog) => blogsService.create(blog, user.token),
    onSuccess: (blog) => {
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
          />
        }
      </Toggleable>
      <br />
      <div>
        {blogs
          .sort((b1, b2) => b2.likes - b1.likes)
          .map(b => <Blog
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
