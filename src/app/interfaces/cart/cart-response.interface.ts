import { CartItemResponse } from "./cart-item-response.interface";


export interface CartResponse {
  id: number;
  userId: number;
  cartItemsResponse: CartItemResponse[];
  total: number;
}
