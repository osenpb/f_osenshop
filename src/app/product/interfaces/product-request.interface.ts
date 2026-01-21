export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  isActive: boolean;
}
