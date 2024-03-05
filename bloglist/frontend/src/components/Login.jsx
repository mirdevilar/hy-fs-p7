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
      <form onSubmit={handleLogin} className="flex *:mx-4 *-md:max-w-20">
        <div className="flex *:my-auto *:mx-2 ">
          <label>username:</label>
          <input
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => {setUsername(target.value)}}
            className="input"
          />
        </div>
        <div className="flex *:my-auto *:px-2 ">
          <label>password:</label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => {setPassword(target.value)}}
          />
        </div>
        <div>
          <button type="submit" className="button font-bold">log in</button>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </section>
  )
}

export default Login
