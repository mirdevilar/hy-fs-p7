import { useEffect, useState } from 'react'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'
import Toggleable from './components/Toggleable'

import blogsService from './services/blogsService'
import CreateForm from './components/CreateForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogsService.getAll()
      .then(initialBlogs => {setBlogs(initialBlogs)})
  }, [])

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const notify = (msg, color) => {
    setNotification({ msg, color })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
  }

  return (
    <>
      <h1><i>Blogs app</i></h1>
      {notification && <p style={{ color: notification.color }}>{notification.msg}</p>}
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {!user && <Login setUser={setUser} />}
      {user && <BlogsSection blogs={blogs} setBlogs={setBlogs} user={user} notify={notify} />}
    </>
  )
}

export default App