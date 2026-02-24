import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {

  product = input.required<ProductResponse | undefined>();

}
