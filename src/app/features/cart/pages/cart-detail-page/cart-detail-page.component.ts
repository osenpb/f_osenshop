
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';

import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { CartItemListComponent } from "../../components/cart-item-list/cart-item-list.component";
import { CartSummaryComponent } from "../../components/cart-summary/cart-summary.component";
import { CartService } from '../../../../services/cart.service';
import { LoadingSpinnerComponent } from "../../../home/components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-cart-detail-page',
  imports: [CartItemListComponent, CartSummaryComponent, LoadingSpinnerComponent],
  templateUrl: './cart-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartDetailPageComponent {

  cartService = inject(CartService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  readonly cart = this.cartService.cart;
  readonly cartItems = this.cartService.cartItems;
  readonly error = this.cartService.error;
  readonly isLoading = this.cartService.isLoading;



}
