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
  page = signal(0);
  size = signal(6);

  productResource = rxResource<PageResponse<ProductResponse>, { page: number; size: number }>({
    params: () => ({
      page: this.page(),
      size: this.size(),
    }),
    stream: ({ params }) => {
      return this.productService.getProductsPageable(
        params.page,
        params.size
      )
    }
  });

  // productResource - signal handling
products = computed<ProductResponse[]>(() => {
  const data = this.productResource.value();
  return data?.content ?? [];
});


  isLoading = this.productResource.isLoading;
  error = this.productResource.error;


  prevPage() {
    const current = this.productResource.value()?.page.number ?? 0;
    if (current > 0) this.page.set(current - 1);
  }

  nextPage() {
    const current = this.productResource.value()?.page.number ?? 0;
    const total = this.productResource.value()?.page.totalPages ?? 1;
    if (current + 1 < total) this.page.set(current + 1);
  }

}

