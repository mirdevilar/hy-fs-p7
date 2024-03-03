import { Link } from 'react-router-dom'

import useResources from '../hooks/useResources'

const Users = ({ users }) => {

  return (
    <div>
      <h2><i>Users</i></h2>
      <table>
        <thead>
          <tr>
            <td></td>
            <td style={{ fontWeight: 'bold' }}>blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map(u =>
            <tr key={u.username}>
              <td>
                <Link to={`/users/${u.username}`}>{u.username}</Link>
              </td>
              <td>
                {u.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
