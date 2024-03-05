import { createContext, useReducer, useEffect } from "react";

import loginService from "../services/loginService";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "REMOVE":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer);

  const loadUser = () => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      userDispatch({ type: "SET", payload: JSON.parse(storedUser) });
    }
  };

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      userDispatch({ type: "SET", payload: user });
      window.localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return null;
    }
  };

  const logout = () => {
    userDispatch({ type: "REMOVE" });
    window.localStorage.removeItem("user");
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loadUser, login, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
