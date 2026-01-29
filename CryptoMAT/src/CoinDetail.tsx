import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCoinDetail, useHistoricalData } from './hooks/useCoins';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';
import './CoinDetail.css';
import type { TimeRange } from './types';

function CoinDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  
  const { data: coin, isLoading: coinLoading, isError: coinError } = useCoinDetail(id || '');
  const { data: historicalData, isLoading: historyLoading } = useHistoricalData(id || '', timeRange);

  if (coinLoading) return <Loading />;
  if (coinError) return <ErrorMessage message="Errore nel caricamento del dettaglio" />;
  if (!coin) return null;

  const currentPrice = coin.market_data.current_price.usd;
  const priceChange24h = coin.market_data.price_change_percentage_24h;
  const high24h = coin.market_data.high_24h.usd;
  const low24h = coin.market_data.low_24h.usd;
  const marketCap = coin.market_data.market_cap.usd;
  const volume = coin.market_data.circulating_supply;
  const totalSupply = coin.market_data.total_supply;

  return (
    <div className="detail-container">
      <button onClick={() => navigate('/')} className="back-button">
        ← Torna alla lista
      </button>

      <div className="detail-header">
        <div className="coin-title-section">
          <img src={coin.image.large} alt={coin.name} style={{ width: 64, height: 64 }} />
          <h1 className="coin-title">{coin.name}</h1>
          <span className="coin-symbol-badge">{coin.symbol.toUpperCase()}</span>
          <span className="coin-rank">Rank #{coin.market_data.market_cap_rank}</span>
        </div>
      </div>

      <div className="price-section">
        <div className="main-price">
          <span className="price-label">Prezzo attuale</span>
          <h2 className="price-value">
            ${currentPrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <span className={priceChange24h >= 0 ? 'change-positive' : 'change-negative'}>
            {priceChange24h >= 0 ? '▲' : '▼'} {Math.abs(priceChange24h).toFixed(2)}% (24h)
          </span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-content">
            <span className="stat-label">Market Cap</span>
            <span className="stat-value">${(marketCap / 1_000_000_000).toFixed(2)}B</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">📈</span>
          <div className="stat-content">
            <span className="stat-label">Massimo 24h</span>
            <span className="stat-value">${high24h.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">📉</span>
          <div className="stat-content">
            <span className="stat-label">Minimo 24h</span>
            <span className="stat-value">${low24h.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <span className="stat-icon">💰</span>
          <div className="stat-content">
            <span className="stat-label">Offerta Circolante</span>
            <span className="stat-value">{(volume / 1_000_000).toFixed(2)}M</span>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <div className="chart-header">
          <h2 className="chart-title">Storico Prezzi</h2>
          <div className="time-filters">
            <button 
              className={`time-filter-btn ${timeRange === 'daily' ? 'active' : ''}`}
              onClick={() => setTimeRange('daily')}
            >
              24h
            </button>
            <button 
              className={`time-filter-btn ${timeRange === 'weekly' ? 'active' : ''}`}
              onClick={() => setTimeRange('weekly')}
            >
              7d
            </button>
            <button 
              className={`time-filter-btn ${timeRange === 'monthly' ? 'active' : ''}`}
              onClick={() => setTimeRange('monthly')}
            >
              30d
            </button>
          </div>
        </div>

        {historyLoading ? (
          <Loading />
        ) : (
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="timestamp" 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.85rem' }}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.5)"
                  style={{ fontSize: '0.85rem' }}
                  domain={['auto', 'auto']}
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 12, 41, 0.95)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '10px',
                    color: '#fff'
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#667eea" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#667eea' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {coin.description.en && (
        <div className="description-section">
          <h2 className="section-title">Informazioni su {coin.name}</h2>
          <p className="description-text">
            {coin.description.en.replace(/<[^>]*>/g, '').substring(0, 500)}...
          </p>
        </div>
      )}
    </div>
  );
}

export default CoinDetail;