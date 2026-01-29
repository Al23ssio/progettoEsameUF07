import type { Coin, CoinDetail, HistoricalData, TimeRange } from '../types';

//url dell'api coingecko
const BASE_URL = 'https://api.coingecko.com/api/v3';

/**
 * recupera la lista delle criptovalute
 * @param page - num di pagina
 * @param perPage - num di elementi per pagina
 * @returns promise con array di Coin
 */
export async function fetchCoins(page: number = 1, perPage: number = 100): Promise<Coin[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coins:', error);
    throw error;
  }
}

/**
 * recupera i dettagli di una specifica criptovaluta
 * @param id - ID della coin (es: 'bitcoin')
 * @returns promise con CoinDetail
 */
export async function fetchCoinDetail(id: string): Promise<CoinDetail> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}?localization=false&tickers=false&community_data=false&developer_data=false`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    throw error;
  }
}

/**
 * recupera i dati storici di una criptovaluta
 * @param id - ID della coin
 * @param days - num di giorni da recuperare
 * @returns promise con array di HistoricalData
 */
export async function fetchHistoricalData(
  id: string,
  days: string = '7'
): Promise<[number, number][]> {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.prices || [];
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}

/**
 * aggiunge una coin ai preferiti
 * @param coinId - ID della coin da aggiungere
 * @returns promise con successo operazione
 */
export async function addToFavorites(coinId: string): Promise<{ success: boolean }> {
  // Simulazione chiamata POST
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Added ${coinId} to favorites`);
      resolve({ success: true });
    }, 500);
  });
}

/**
 * rimuove una coin dai preferiti 
 * @param coinId - ID della coin da rimuovere
 * @returns promise con successo operazione
 */
export async function removeFromFavorites(coinId: string): Promise<{ success: boolean }> {
  // Simulazione chiamata POST
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Removed ${coinId} from favorites`);
      resolve({ success: true });
    }, 500);
  });
}