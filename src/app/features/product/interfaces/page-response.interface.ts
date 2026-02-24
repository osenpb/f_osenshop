import { ProductResponse } from "./product-response.interface";

export interface PageResponse<T> {
  content: T[];
  page: PageInfo
}

export interface PageInfo {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
