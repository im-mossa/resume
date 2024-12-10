import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BodyPage1 from './BodyPage-1'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BodyPage1 />
  </StrictMode>,
)
