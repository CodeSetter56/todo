import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext.jsx'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const query = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus:false
    }
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={query}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)