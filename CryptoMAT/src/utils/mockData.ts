import type { Coin, CoinDetail, HistoricalData, TimeRange } from '../types';

/**
 * funzione seeded random per generare valori consistenti
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Mock data per le coin principali
 */
const MOCK_COINS: Coin[] = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
    current_price: 97234.56,
    market_cap: 1923456789012,
    market_cap_rank: 1,
    price_change_percentage_24h: 2.34,
    isFavorite: false,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
    current_price: 3456.78,
    market_cap: 415678901234,
    market_cap_rank: 2,
    price_change_percentage_24h: -1.23,
    isFavorite: false,
  },
  {
    id: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
    current_price: 1.00,
    market_cap: 95678901234,
    market_cap_rank: 3,
    price_change_percentage_24h: 0.01,
    isFavorite: false,
  },
  {
    id: 'binancecoin',
    symbol: 'bnb',
    name: 'BNB',
    image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    current_price: 612.34,
    market_cap: 89456789012,
    market_cap_rank: 4,
    price_change_percentage_24h: 1.56,
    isFavorite: false,
  },
  {
    id: 'solana',
    symbol: 'sol',
    name: 'Solana',
    image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
    current_price: 234.56,
    market_cap: 78901234567,
    market_cap_rank: 5,
    price_change_percentage_24h: 3.45,
    isFavorite: false,
  },
];

// genera dettagli mock per una coin specifica
export function generateMockCoinDetail(id: string): CoinDetail {
  const coin = MOCK_COINS.find(c => c.id === id) || MOCK_COINS[0];
  
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    description: {
      en: `${coin.name} è una criptovaluta inesistente utilizzata come test per il progetto CryptoMAT.`,
    },
    image: {
      large: coin.image,
    },
    market_data: {
      current_price: {
        usd: coin.current_price,
      },
      market_cap: {
        usd: coin.market_cap,
      },
      market_cap_rank: coin.market_cap_rank,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      high_24h: {
        usd: coin.current_price * 1.05,
      },
      low_24h: {
        usd: coin.current_price * 0.95,
      },
      circulating_supply: coin.market_cap / coin.current_price,
      total_supply: (coin.market_cap / coin.current_price) * 1.1,
    },
  };
}

// genera dati storici mock per una coin specifica e range di tempo
export function generateHistoricalData(coinId: string, range: TimeRange): HistoricalData[] {
  const coin = MOCK_COINS.find(c => c.id === coinId) || MOCK_COINS[0];
  const basePrice = coin.current_price;
  const data: HistoricalData[] = [];
  const now = Date.now();
  
  // seed base univoco per coin
  const baseSeed = coinId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  if (range === 'daily') {
    // giornaliero: ultime 24 h
    for (let i = 23; i >= 0; i--) {
      const timestamp = now - (i * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const hour = date.getHours();
      const label = `${hour.toString().padStart(2, '0')}:00`;
      
      // SEED FISSO: basato su coinId + ora specifica
      const fixedSeed = baseSeed * 1000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.01;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  } else if (range === 'weekly') {
    // settimanale: ultimi 7 giorni
    for (let i = 6; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // SEED FISSO: basato su coinId + giorno specifico
      const fixedSeed = baseSeed * 2000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.06;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  } else if (range === 'monthly') {
    // mensile: ultimi 30 gionri
    for (let i = 29; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // SEED FISSO: basato su coinId + giorno specifico
      const fixedSeed = baseSeed * 3000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.16;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  }

  return data;
}

// esporta i mock data
export { MOCK_COINS };