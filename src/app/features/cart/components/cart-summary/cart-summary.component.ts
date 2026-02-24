
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart.service';


@Component({
  selector: 'app-cart-summary',
  imports: [RouterLink],
  templateUrl: './cart-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartSummaryComponent {

  cartService = inject(CartService);



}
