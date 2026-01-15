
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { ProductResponse } from '../product/interfaces/product-response.interface';
import { ProductRequest } from '../product/interfaces/product-request.interface';
import { UpdateProductRequest } from '../product/interfaces/update-product-request';
import { environment } from '../../environments/environment';
import { PageInfo, PageResponse } from '../product/interfaces/page-response.interface';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, map, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseUrl = `${environment.apiUrl}/products`;
  private http = inject(HttpClient);

  page = signal(0);
  size = signal(6);

  search = signal<string | null>(null);

  // === RESOURCE ===


  productResource = rxResource<PageResponse<ProductResponse>, { page: number; size: number; search: string }>({
  params: () => ({
    page: this.page(),
    size: this.size(),
    search: this.search() ?? '',
  }),
  stream: ({ params }) => {

    if (params.search?.trim()) {
      return this.getProductsByName(params.search).pipe(
        map(products => ({
          content: products,
          page: {
            number: 0,
            size: params.size,
            totalElements: products.length,
            totalPages: 1
          }
        })),
        catchError(() =>
          of({
            content: [],
            page: {
              number: 0,
              size: params.size,
              totalElements: 0,
              totalPages: 0
            }
          })
        )
      );
    }

    return this.getProductsPageable(params.page, params.size).pipe(
      catchError(() =>
        of({
          content: [],
          page: {
            number: params.page,
            size: params.size,
            totalElements: 0,
            totalPages: 0
          }
        })
      )
    );
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

  readonly emptySearchMessage = computed<string | null>(() => {
    const data = this.productResource.value();

    if (!data) return null;

    if (
      this.search() &&
      data.content.length === 0
    ) {
      return 'No se encontraron productos';
    }

    return null;
  });

  getProducts() {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}`);
  }

  getProductsPageable(page: number, size: number) {
    return this.http.get<PageResponse<ProductResponse>>(`${this.baseUrl}/pageable`, { params: { page, size } });
  }
  getProductById(id: number) {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }

  getProductsByName(name: string) {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/find`, { params: { name } })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let message = 'Error al buscar el producto';
          if (error.status === 404) {
            message = 'No se encontró el producto';
          }
          return throwError(() => new Error(message));
        })
      );

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
