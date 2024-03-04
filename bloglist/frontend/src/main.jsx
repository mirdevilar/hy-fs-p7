import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import { BlogsContextProvider } from './contexts/BlogsContext'
import { NotificationContextProvider } from './contexts/NotificationContext'
import { UserContextProvider } from './contexts/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <UserContextProvider>
          <BlogsContextProvider>
            <App />
          </BlogsContextProvider>
        </UserContextProvider>
      </NotificationContextProvider>
    </QueryClientProvider>
  </Router>
)
