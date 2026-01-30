import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { TimeRange } from '../types';
import {
  fetchCoins,
  fetchCoinDetail,
  fetchHistoricalData,
  addToFavorites,
  removeFromFavorites,
} from '../services/coinApi';
import { MOCK_COINS, generateMockCoinDetail, generateHistoricalData } from '../utils/mockData';
import { aggregateHistoricalData } from '../utils/helpers';

// hook per recuperare la lista delle criptovalute con paginazione
export function useCoins(page: number = 1) {
  return useQuery({
    queryKey: ['coins', page],
    queryFn: async () => {
      try {
        const data = await fetchCoins(page, 50);
        return { coins: data, isMockData: false };
      } catch (error) {
        console.warn('API fallita, uso mock data:', error);
        // Simula la paginazione sui dati mock
        const start = (page - 1) * 50;
        const end = start + 50;
        return { coins: MOCK_COINS.slice(start, end), isMockData: true };
      }
    },
  });
}

// hook per recuperare i dettagli di una specifica coin
export function useCoinDetail(id: string) {
  return useQuery({
    queryKey: ['coin', id],
    queryFn: async () => {
      try {
        const data = await fetchCoinDetail(id);
        return data;
      } catch (error) {
        console.warn('API fallita, uso mock data:', error);
        return generateMockCoinDetail(id);
      }
    },
    enabled: !!id,
  });
}

//hook per recuperare i dati storici di una specifica coin
export function useHistoricalData(id: string, range: TimeRange) {
  return useQuery({
    queryKey: ['historical', id, range],
    queryFn: async () => {
      try {
        let days = '1';
        switch (range) {
          case 'daily':
            days = '1';
            break;
          case 'weekly':
            days = '7';
            break;
          case 'monthly':
            days = '30';
            break;
        }
        
        const data = await fetchHistoricalData(id, days);
        return aggregateHistoricalData(data, range);
      } catch (error) {
        console.warn('API fallita, uso mock data:', error);
        return generateHistoricalData(id, range);
      }
    },
    enabled: !!id,
  });
}

// hook per aggiungere una coin ai preferiti
export function useAddToFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToFavorites,
    onSuccess: () => {
      // invalida la cache per ricaricare i dati
      queryClient.invalidateQueries({ queryKey: ['coins'] });
    },
  });
}

//hook per rimuovere una coin dai preferiti
export function useRemoveFromFavorites() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromFavorites,
    onSuccess: () => {
      // invalida la cache per ricaricare i dati
      queryClient.invalidateQueries({ queryKey: ['coins'] });
    },
  });
}