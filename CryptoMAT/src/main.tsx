import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'

// Configurazione React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minuti
    },
  },
})

// Componente temporaneo per la home
function App() {
  return (
    <div>
      <h1>CryptoMAT</h1>
      <p>Lista criptovalute in arrivo...</p>
    </div>
  )
}

// Componente temporaneo per il dettaglio
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)