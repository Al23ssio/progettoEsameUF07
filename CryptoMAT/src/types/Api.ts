// interfaccia generica per le risposte API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// interfaccia per gli errori API
export interface ApiError {
  message: string;
  status: number;
  error?: unknown;
}

// interfaccia per le risposte paginate
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  per_page: number;
}