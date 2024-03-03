import { useEffect, useState, useReducer, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, useMatch } from 'react-router-dom'

import BlogsSection from './components/BlogsSection'
import Login from './components/Login'
import Toggleable from './components/Toggleable'
import Notification from './components/Notification'
import CreateForm from './components/CreateForm'
import Users from './components/Users'
import User from './components/User'

import UserContext from './contexts/UserContext'

import useResources from './hooks/useResources'

const App = () => {
  const { user, loadUser, logout } = useContext(UserContext)
  const [users] = useResources('http://localhost:3003/api/users')

  useEffect(() => {
    loadUser()
  }, [])

  const handleLogout = () => {
    logout()
  }

  const match = useMatch('/users/:username')
  const userToShow = match
    ? users.find(u => u.username === match.params.username)
    : null

  return (
    <div>
      <h1><i>Blogs app</i></h1>
      <Notification />
      {user && <p>Logged in as <b>{user.username}</b> <button onClick={handleLogout} >Log out</button></p>}
      {!user && <Login />}
      <Routes>
        <Route path="/" element={<BlogsSection />} />
        {userToShow && <Route path="/users/:username" element={<User user={userToShow} />} />}
        <Route path="/users/*" element={<Users users={users} />} />
      </Routes>
    </div>
  )
}

export default App
