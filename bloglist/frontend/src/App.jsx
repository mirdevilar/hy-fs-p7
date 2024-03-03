import { useEffect, useState, useReducer, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom'

import Blog from './components/Blog'
import BlogsSection from './components/BlogsSection'
import CreateForm from './components/CreateForm'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import Users from './components/Users'
import User from './components/User'

import BlogsContext from './contexts/BlogsContext'
import UserContext from './contexts/UserContext'

import useResources from './hooks/useResources'
import useMatchedResource from './hooks/useMatchedResource'

const App = () => {
  const { blogs } = useContext(BlogsContext)
  const { user, loadUser, logout } = useContext(UserContext)
  const [users] = useResources('http://localhost:3003/api/users')

  useEffect(() => {
    loadUser()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const matchedUser = useMatchedResource(users, '/users/:username')
  const matchedBlog = useMatchedResource(blogs, '/blogs/:id')

  return (
    <div>
      <h1><i>Blogs app</i></h1>
      <Notification />
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {!user && <Login />}
      <Routes>
        {matchedBlog && <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />}
        <Route path="/" element={<BlogsSection />} />
        {matchedUser && <Route path="/users/:username" element={<User user={matchedUser} />} />}
        <Route path="/users/*" element={<Users users={users} />} />
      </Routes>
    </div>
  )
}

export default App
