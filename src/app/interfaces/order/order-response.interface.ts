import { OrderItemResponse } from "./order-item-response.interface";

export interface OrderResponse {
  id: number;
  userId: number;
  total: number;
  status: string;
  shippingAddress: string;
  createdAt: Date;
  items: OrderItemResponse[];

}
