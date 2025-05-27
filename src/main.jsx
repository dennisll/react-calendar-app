import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import { CalendarApp } from './CalendarApp'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
   //<StrictMode>  
      <CalendarApp />
   //</StrictMode>,
)
