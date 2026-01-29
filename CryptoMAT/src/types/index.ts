// esportazione dei tipi definiti nei file Coin.ts e Api.ts (tutti ciò che rientrano nella caartella types)
export type {
  Coin,
  CoinQuote,
  CoinDetail,
  HistoricalData,
  WebSocketData,
  TimeRange,
  SortOrder,
  SortBy,
} from './Coin';

export type {
  ApiResponse,
  ApiError,
  PaginatedResponse,
} from './Api';