import { Link } from "react-router-dom";

const User = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>
            <Link to={`/blogs/${b.id}`}>{b.title}</Link> by {b.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default User;
