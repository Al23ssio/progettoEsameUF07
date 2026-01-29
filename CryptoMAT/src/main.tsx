import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

// componente che indica che si è nella pagina principale che elencherà le criptovalute in futuro
function App() {
  return (
    <div>
      <h1>CryptoMAT</h1>
      <p>Lista criptovalute in arrivo...</p>
    </div>
  )
}

// componente che indica banalmente che si è nella pagina di una detrmianta coin che arriverà in futuro
function CoinDetail() {
  return (
    <div>
      <h1>Dettaglio Coin</h1>
      <p>Dettagli in arrivo...</p>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)