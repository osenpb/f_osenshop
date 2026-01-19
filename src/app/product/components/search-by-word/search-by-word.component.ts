import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-search-by-word',
  imports: [],
   template: `
    <input
      #input
      type="text"
      placeholder="BUSCAR PRODUCTO..."
      (keyup.enter)="searchProducts(input.value)"
      class="w-full bg-zinc-[#f2f2f2] border border-zinc-900 rounded-full
             py-3 pl-12 pr-4 text-[10px] tracking-[0.2em] text-black
             placeholder-zinc-700 focus:outline-none focus:ring-1
             focus:ring-zinc-800 transition-all duration-500
             font-mono uppercase"
    />

    <button (click)="searchProducts(input.value)">
      Buscar
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchByWordComponent {


  private productService = inject(ProductService);


  // signal compartido con el service
  products = this.productService.products;
  search = this.productService.search;
  page = this.productService.page;


  searchProducts(value: string) {
    const normalized = value.trim();
      this.page.set(0);

        if (normalized === '') {
          this.search.set(null); // ← vuelve a listado completo
        } else {
          this.search.set(normalized);
        }
  }

}
