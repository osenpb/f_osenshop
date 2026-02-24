import { ProductResponse } from "../../features/product/interfaces/product-response.interface";

export interface CartItemResponse {
  id: number;
  cartId: number;
  productResponse: ProductResponse;
  quantity: number;
}
