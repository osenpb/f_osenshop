import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductResponse } from '../../../product/interfaces/product-response.interface';

@Component({
  selector: 'app-added-to-cart-modal',
  imports: [DecimalPipe],
  templateUrl: './added-to-cart-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddedToCartModalComponent {

  product = input.required<ProductResponse | null | undefined>();
  quantity = input.required<number>();

  close() {
throw new Error('Method not implemented.');
}
}
