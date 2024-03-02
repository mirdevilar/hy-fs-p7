import { useEffect, useState, useReducer, useContext } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'

import CreateForm from './components/CreateForm'

const App = () => {
  const [user, setUser] = useState(null)

  // const [blogs, setBlogs] = useState([])

  // useEffect(() => {
  //   blogsService.getAll()
  //     .then(initialBlogs => {setBlogs(initialBlogs)})
  // }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <div>
      <h1><i>Blogs app</i></h1>
      <Notification />
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {!user && <Login setUser={setUser} />}
      {user && <BlogsSection user={user} />}
    </div>
  )
}

export default App
