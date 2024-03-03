import { useState, useContext } from 'react'

import UserContext from '../contexts/UserContext'

const Login = () => {
  // use global states and managers
  const { login } = useContext(UserContext)

  // component states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  // login handler
  const handleLogin = async e => {
    e.preventDefault()

    const loggedUser = login(username, password)

    if (loggedUser) {
      setUsername('')
      setPassword('')
    } else {
      setErrorMessage('Wrong credentials!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <section>
      <h2><i>Log in</i></h2>
      <form onSubmit={handleLogin}>
        Username
        <input
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => {setUsername(target.value)}}
        /><br />
        Password
        <input
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => {setPassword(target.value)}}
        /><br />
        <button type="submit">Log in</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </section>
  )
}

export default Login
