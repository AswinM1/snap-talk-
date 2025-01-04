import "regenerator-runtime/runtime";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from '@clerk/themes'


const PUBLISHABLE_KEY = "pk_test_bWFqb3ItamF5LTY4LmNsZXJrLmFjY291bnRzLmRldiQ"

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} appearance={{
      baseTheme:dark,
    }}>
    <BrowserRouter>
  
    <App />
    
    </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
)
