import React from 'react'
import ReactDOM from 'react-dom/client'
import { Demo } from './components/Demo'
import { TimelinePage } from './pages/TimelinePage'
import './styles/base.css'

// Simple routing based on URL path
const App: React.FC = () => {
  const path = window.location.pathname

  if (path === '/timeline') {
    return <TimelinePage />
  }

  return <Demo />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)