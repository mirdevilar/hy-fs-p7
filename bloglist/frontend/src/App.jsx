import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Blog from "./components/Blog";
import BlogsSection from "./components/BlogsSection";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import Users from "./components/Users";
import User from "./components/User";

import BlogsContext from "./contexts/BlogsContext";
import UserContext from "./contexts/UserContext";

import useMatchedResource from "./hooks/useMatchedResource";
import useResources from "./hooks/useResources";

const App = () => {
  // states
  const { blogs } = useContext(BlogsContext);
  const { user, loadUser, logout } = useContext(UserContext);
  const [users] = useResources("http://localhost:3003/api/users");

  // get corresponding resources for parametric routes
  const matchedUser = useMatchedResource(users, "/users/:username");
  const matchedBlog = useMatchedResource(blogs, "/blogs/:id");

  return (
    <div className="min-h-screen font-mono bg-light-accent">
      <Navbar />
      <div id="content" className="container mx-auto bg-light-accent mt-40">
        <Notification />
        <Routes>
          {matchedUser && (
            <Route
              path="/users/:username"
              element={<User user={matchedUser} />}
            />
          )}
          <Route path="/users/*" element={<Users users={users} />} />

          {matchedBlog && (
            <Route path="/blogs/:id" element={<Blog blog={matchedBlog} />} />
          )}
          <Route path="/*" element={<BlogsSection />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
