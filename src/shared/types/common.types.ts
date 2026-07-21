export type ID = string | number;

export type Nullable<T> = T | null;

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
