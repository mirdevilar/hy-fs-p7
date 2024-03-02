import useResources from '../hooks/useResources'

const Users = () => {
  const [users, userService] = useResources()

  return (
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
              {u.username}
            </td>
            <td>
              {u.blogs.length}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default Users
