import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { enableMapSet } from 'immer';
import { AppProvider } from './contexts/AppProvider.jsx';
enableMapSet()


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
    <ToastContainer position='top-center' />
  </React.StrictMode>,
)
