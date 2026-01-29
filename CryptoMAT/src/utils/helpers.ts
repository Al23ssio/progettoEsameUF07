import type { HistoricalData, TimeRange } from '../types';

//formatta un numero in USD 🦅🦅🦅
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// formatta numeri enormi tipo market cap che spesso è espreeso in miliardi 
export function formatLargeNumber(value: number): string {
  if (value >= 1_000_000_000_000) {
    return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
  }
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  return `$${value.toFixed(2)}`;
}

// formatta la percentuale di cambio
export function formatPercentage(value: number): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

// dati storici aggregati in base al range temporale
export function aggregateHistoricalData(
  prices: [number, number][],
  range: TimeRange
): HistoricalData[] {
  const result: HistoricalData[] = [];

  if (range === 'daily') {
    // giornaliero: ultime 24 h 
    const now = Date.now();
    const hourMs = 60 * 60 * 1000;
    
    for (let i = 23; i >= 0; i--) {
      const startTime = now - (i + 1) * hourMs;
      const endTime = now - i * hourMs;
      const date = new Date(endTime);
      const hour = date.getHours();
      const label = `${hour.toString().padStart(2, '0')}:00`;
      
      const periodPrices = prices.filter(([timestamp]) => timestamp >= startTime && timestamp <= endTime);
      
      if (periodPrices.length > 0) {
        const avgPrice = periodPrices.reduce((sum, [, price]) => sum + price, 0) / periodPrices.length;
        result.push({ timestamp: label, price: avgPrice });
      }
    }
  } else if (range === 'weekly') {
    // settimanale: ultimi 7 giorni
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = 6; i >= 0; i--) {
      const startTime = now - (i + 1) * dayMs;
      const endTime = now - i * dayMs;
      const date = new Date(endTime);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      const periodPrices = prices.filter(([timestamp]) => timestamp >= startTime && timestamp <= endTime);
      
      if (periodPrices.length > 0) {
        const avgPrice = periodPrices.reduce((sum, [, price]) => sum + price, 0) / periodPrices.length;
        result.push({ timestamp: label, price: avgPrice });
      }
    }
  } else if (range === 'monthly') {
    // mensile: ultimi 30 giorni
    const now = Date.now();
    const dayMs = 24 * 60 * 60 * 1000;
    
    for (let i = 29; i >= 0; i--) {
      const startTime = now - (i + 1) * dayMs;
      const endTime = now - i * dayMs;
      const date = new Date(endTime);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      const periodPrices = prices.filter(([timestamp]) => timestamp >= startTime && timestamp <= endTime);
      
      if (periodPrices.length > 0) {
        const avgPrice = periodPrices.reduce((sum, [, price]) => sum + price, 0) / periodPrices.length;
        result.push({ timestamp: label, price: avgPrice });
      }
    }
  }

  return result;
}

// rimuove i tag HTML da una stringa
export function stripHtmlTags(html: string, maxLength: number = 200): string {
  const text = html.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}