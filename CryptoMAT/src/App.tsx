import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCoins } from './hooks/useCoins';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import './App.css';
import type { Coin, SortBy, SortOrder } from './types';

function App() {
  const navigate = useNavigate();
  const { data: coins, isLoading, isError } = useCoins();
  
  const [sortBy, setSortBy] = useState<SortBy>('market_cap');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');

  if (isLoading) return <Loading />;
  if (isError) return <ErrorMessage message="Errore nel caricamento dei dati" />;
  if (!coins) return null;

  // Filter coins based on search
  let filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort coins
  filteredCoins.sort((a, b) => {
    let aValue = 0;
    let bValue = 0;

    switch (sortBy) {
      case 'name':
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      case 'price':
        aValue = a.current_price;
        bValue = b.current_price;
        break;
      case 'market_cap':
        aValue = a.market_cap;
        bValue = b.market_cap;
        break;
      case 'price_change':
        aValue = a.price_change_percentage_24h;
        bValue = b.price_change_percentage_24h;
        break;
    }

    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (field: SortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">CryptoMAT</h1>
        <p className="app-subtitle">Prezzi e dati di mercato in tempo reale</p>
      </header>

      <div className="controls-container">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or symbol..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="sort-controls">
          <label className="sort-label">Ordina per:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSort(e.target.value as SortBy)}
            className="sort-select"
          >
            <option value="market_cap">Market Cap</option>
            <option value="name">Nome</option>
            <option value="price">Prezzo</option>
            <option value="price_change">Cambio 24h</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="sort-order-btn"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      <div className="results-info">
        Mostrando {filteredCoins.length} di {coins.length} criptovalute
      </div>

      <div className="table-container">
        <table className="crypto-table">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                Nome {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Simbolo</th>
              <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                Prezzo {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('price_change')} style={{ cursor: 'pointer' }}>
                24h % {sortBy === 'price_change' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => handleSort('market_cap')} style={{ cursor: 'pointer' }}>
                Market Cap {sortBy === 'market_cap' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.slice(0, 50).map((coin) => (
              <tr
                key={coin.id}
                onClick={() => navigate(`/coin/${coin.id}`)}
                className="crypto-row"
              >
                <td className="rank-cell">#{coin.market_cap_rank}</td>
                <td className="name-cell">
                  <img src={coin.image} alt={coin.name} style={{ width: 24, height: 24, marginRight: 8, verticalAlign: 'middle' }} />
                  {coin.name}
                </td>
                <td>
                  <span className="symbol-cell">{coin.symbol.toUpperCase()}</span>
                </td>
                <td className="price-cell">
                  ${coin.current_price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}
                </td>
                <td>
                  <span className={coin.price_change_percentage_24h >= 0 ? 'change-positive' : 'change-negative'}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </td>
                <td className="market-cap-cell">
                  ${(coin.market_cap / 1_000_000_000).toFixed(2)}B
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;