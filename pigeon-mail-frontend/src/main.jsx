import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PigeonMail from './PigeonMail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PigeonMail />
  </StrictMode>,
)
