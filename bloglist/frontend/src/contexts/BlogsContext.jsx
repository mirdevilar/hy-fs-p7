import { createContext, useContext, useRef } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import blogsService from '../services/blogsService'

import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

const BlogsContext = createContext()

export const BlogsContextProvider = (props) => {
  const queryClient = useQueryClient()

  const { notify } = useContext(NotificationContext)
  const { user } = useContext(UserContext)

  const { data: blogs, ...query } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogsService.getAll,
  })

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => blogsService.update({ ...blog }, user.token),
    onSuccess: (blog) => {
      queryClient.setQueryData(['blogs'], blogs.map((b) => b.id === blog.id ? blog : b))
    },
    onError: () => {
      notify('Vote could not be sent!', 'red')
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogsService.remove(blog.id, user.token),
    onSuccess: (response, blog) => {
      queryClient.setQueryData(['blogs'], blogs.filter(b => b.id !== blog.id))
      notify(`Deleted blog ${blog.title}!`, 'green')
    },
    onError: () => {
      notify('Blog could not be deleted!', 'red')
    }
  })

  const updateBlog = updateBlogMutation.mutate
  const deleteBlog = deleteBlogMutation.mutate

  return (
    <BlogsContext.Provider value={{
      query, blogs,
      updateBlogMutation, deleteBlogMutation,
      updateBlog, deleteBlog,
    }}>
      {props.children}
    </BlogsContext.Provider>
  )
}

export default BlogsContext
