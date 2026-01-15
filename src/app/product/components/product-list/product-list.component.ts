import { ChangeDetectionStrategy, Component, computed, inject, signal, } from '@angular/core';

import { rxResource } from '@angular/core/rxjs-interop';

import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { LoadingSpinnerComponent } from '../../../home/components/loading-spinner/loading-spinner.component';
import { PageResponse } from '../../interfaces/page-response.interface';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { tap } from 'rxjs';

interface ProductPageRequest {
  page: number;
  size: number;
}

@Component({
  selector: 'app-home-product-list',
  imports: [ProductCardComponent, LoadingSpinnerComponent],
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  totalPages: any;
  loadProducts() {
    throw new Error('Method not implemented.');
  }

  private productService = inject(ProductService);
  page = this.productService.page;
  size = this.productService.size;

  products = this.productService.products;
  isLoading = this.productService.isLoading;
  error = this.productService.error;
  pageInfo = this.productService.pageInfo;

  emptySearchMessage = this.productService.emptySearchMessage;

  prevPage() {

    const current = this.pageInfo().number ?? 0;
    // const current = this.productService.productResource.value()?.page.number ?? 0;
    if (current > 0) this.page.set(current - 1);
  }

  nextPage() {
    const current = this.pageInfo()?.number ?? 0;
    const total = this.pageInfo()?.totalPages ?? 1;
    if (current + 1 < total) this.page.set(current + 1);
  }

}

