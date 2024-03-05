import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "RESET":
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

let counter = 0;

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer);

  const notify = (msg, color) => {
    notificationDispatch({ type: "SET", payload: { msg, color } });
    counter++;
    const currentCount = counter;
    setTimeout(() => {
      if (currentCount === counter) {
        notificationDispatch({ type: "RESET" });
      }
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
