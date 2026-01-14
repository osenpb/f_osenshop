
import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductResponse } from '../product/interfaces/product-response.interface';
import { ProductRequest } from '../product/interfaces/product-request.interface';
import { UpdateProductRequest } from '../product/interfaces/update-product-request';
import { environment } from '../../environments/environment';
import { PageInfo, PageResponse } from '../product/interfaces/page-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  page = signal(0);
  size = signal(6);
  // === RESOURCE ===


  productResource = rxResource<PageResponse<ProductResponse>, { page: number; size: number }>({
    params: () => ({
      page: this.page(),
      size: this.size(),
    }),
    stream: ({ params }) => {
      return this.getProductsPageable(
        params.page,
        params.size
      )
    }
  });

  // === RESOURCE STATE HELPERS ===

  products = computed<ProductResponse[]>(() => {
    const data = this.productResource.value();
    return data?.content ?? [];
  });

  pageInfo = computed<PageInfo>(() => {
    const data = this.productResource.value();
    return data?.page ?? { number: 0, size: 0, totalElements: 0, totalPages: 0 };
  });


  readonly isLoading = this.productResource.isLoading;
  readonly error = this.productResource.error;


  getProducts() {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}`);
  }

  getProductsPageable(page: number, size: number) {
    return this.http.get<PageResponse<ProductResponse>>(`${this.baseUrl}/pageable`, { params: { page, size } });
  }
  getProductById(id: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: ProductRequest) {
    return this.http.post<ProductResponse>(`${this.baseUrl}`, product);
  }

  updateProduct(id: number, product: UpdateProductRequest) {
    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete<ProductResponse>(`${this.baseUrl}/${id}`);
  }

}
