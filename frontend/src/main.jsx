import "regenerator-runtime/runtime";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

import { LoginProvider } from './components/LoginContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <LoginProvider>
    <App />
    </LoginProvider>
    </BrowserRouter>
  </StrictMode>,
)
