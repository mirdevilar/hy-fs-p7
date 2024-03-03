const User = ({ user }) => {
  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}><a href={b.url}>{b.title}</a> by {b.author}</li>
        )}
      </ul>
    </div>
  )
}

export default User
