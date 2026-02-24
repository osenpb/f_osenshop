import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

import { environment } from '../../environments/environment';
import { CartResponse } from '../interfaces/cart/cart-response.interface';
import { CartItemResponse } from '../interfaces/cart/cart-item-response.interface';



@Injectable({ providedIn: 'root' })
export class CartService {

  private readonly baseUrl = `${environment.apiUrl}/cart`;
  private readonly http = inject(HttpClient);

  // === RESOURCE ===
  cartResource = rxResource<CartResponse, void>({
    stream: () => this.http.get<CartResponse>(this.baseUrl),
  });

  // === RESOURCE STATE HELPERS ===
  readonly isLoading = computed(() => this.cartResource.isLoading());
  readonly error = computed(() => this.cartResource.error());
  readonly cart = computed(() => this.cartResource.value());

  // === DERIVED STATE ===
  readonly cartItems = computed<CartItemResponse[]>(() => {
    return this.cart()?.cartItemsResponse ?? [];
  });

  readonly total = computed(() =>
    this.cartItems().reduce(
      (acc, item) =>
        acc + item.productResponse.price * item.quantity,
      0
    )
  );

  readonly totalQuantity = computed(() =>
    this.cartItems().reduce(
      (acc, item) => acc + item.quantity,
      0
    )
  );

  // === ACTIONS ===
  removeFromCart(productId: number) {
    this.http
      .delete(`${this.baseUrl}/remove/${productId}`)
      .subscribe(() => this.cartResource.reload());
  }

  addToCart(productId: number, quantity: number) {
    this.http
      .post(`${this.baseUrl}/add`, { productId, quantity })
      .subscribe(() => this.cartResource.reload());
  }

  updateQuantity(productId: number, quantity: number) {
    this.http
      .post(`${this.baseUrl}/${productId}/update`, { quantity })
      .subscribe(() => this.cartResource.reload());
  }
}
