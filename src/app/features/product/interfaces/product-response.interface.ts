import { CategoryResponse } from "./category-response.interface";


export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: CategoryResponse;
  isActive: boolean;
}
