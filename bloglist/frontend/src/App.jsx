import { useEffect, useState, useReducer, useContext } from 'react'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'

import UserContext from './contexts/UserContext'

const App = () => {
  const { user, loadUser, logout } = useContext(UserContext)

  useEffect(() => {
    loadUser()
  }, [])

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h1><i>Blogs app</i></h1>
      <Notification />
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {!user && <Login />}
      {user && <BlogsSection />}
    </div>
  )
}

export default App
