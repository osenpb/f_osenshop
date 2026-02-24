import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CartService } from '../../../../services/cart.service';


@Component({
  selector: 'app-cart-item-list',
  imports: [],
  templateUrl: './cart-item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemListComponent {

  cartService = inject(CartService);

  cartItems = this.cartService.cartItems;

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

}
