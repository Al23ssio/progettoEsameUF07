// interfaccia per una determinata coin
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  isFavorite?: boolean;
}

// interfaccia per le quotazioni di una coin
export interface CoinQuote {
  usd: number;
  usd_market_cap: number;
  usd_24h_change: number;
}

// interfacciaa per i dettagli di una coin
export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: {
    en: string;
  };
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    market_cap_rank: number;
    price_change_percentage_24h: number;
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
  };
}

//interfaccia per i dati storici di una coin
export interface HistoricalData {
  timestamp: string;
  price: number;
}

// interfaccia per i dati ricevuti dal WebSocket (da implementare in futuro)
export interface WebSocketData {
  id: string;
  price: number;
  timestamp: number;
}

// type alias per l'intervallo di tempo
export type TimeRange = 'daily' | 'weekly' | 'monthly';

// type alias per l'ordine di ordinamento
export type SortOrder = 'asc' | 'desc';

// type alias per il campo di ordinamento
export type SortBy = 'name' | 'price' | 'market_cap' | 'price_change';