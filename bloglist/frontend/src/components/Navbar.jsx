import { useContext } from "react";
import { Link } from "react-router-dom";

import Login from "../components/Login";

import UserContext from "../contexts/UserContext";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="bg-black text-light-accent py-4 sticky top-0">
      <div className="container mx-auto">
        <div className="flex items-center">
          <div className="flex items-center max-w-fit">
            <div>
              <a href="/" className="text-3xl font-bold text-light-accent">
                {"<Bloglist />"}
              </a>
            </div>
            <div className="flex items-center px-4 *:mx-2 *:button">
              <Link to="/">blogs</Link>
              <Link to="/users">users</Link>
            </div>
          </div>
          <div className="ml-auto">
            {!user && <Login />}
            {user && (
              <div className="*:mx-4">
                <span>{user.username}</span>
                <button className="button" onClick={logout}>
                  log out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
