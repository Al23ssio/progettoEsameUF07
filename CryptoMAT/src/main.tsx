import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div>
      <h1>CryptoMAT</h1>
      <p>Setup completato!</p>
    </div>
  </StrictMode>,
)