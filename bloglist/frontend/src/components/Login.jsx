import { useState } from 'react'

import loginService from '../services/loginService'
import blogsService from '../services/blogsService'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async e => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('user', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
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