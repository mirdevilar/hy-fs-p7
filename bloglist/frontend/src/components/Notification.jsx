import { useContext } from 'react'

import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)

  if (notification) {
    return <p style={{ color: notification.color }}>{notification.msg}</p>
  }
}

export default Notification
