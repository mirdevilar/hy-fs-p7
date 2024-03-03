import { useContext } from 'react'
import { Link } from 'react-router-dom'

import Login from '../components/Login'

import UserContext from '../contexts/UserContext'

const Navbar = () => {
  const { user, logout } = useContext(UserContext)

  const style = {
    paddingRight: '10px',
  }

  return (
    <nav>
      <Link to="/" style={style}>blogs</Link>
      <Link to="/users" style={style}>users</Link>
      {user &&
        <>
          Logged in as <b>{user.username} </b>
          <button onClick={logout} >Log out</button>
        </>
      }
      {!user && <Login />}
    </nav>
  )
}

export default Navbar
