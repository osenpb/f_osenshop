import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductDetailComponent } from "../../components/product-detail/product-detail.component";

@Component({
  selector: 'app-product-detail-page.component',
  imports: [ProductDetailComponent],
  templateUrl: './product-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailPageComponent { }
