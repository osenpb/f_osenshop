import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductListComponent } from "../../components/product-list/product-list.component";

@Component({
  selector: 'app-product-management-page',
  imports: [ProductListComponent],
  templateUrl: './product-management-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductManagementPageComponent {



}
