import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ProductResponse } from '../../interfaces/product-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { NotificationService } from '../../../services/notification.service';
import { DecimalPipe } from '@angular/common';
import { AddedToCartModalComponent } from "../../../cart/components/added-to-cart-modal.component/added-to-cart-modal.component";
import { LoadingSpinnerComponent } from "../../../home/components/loading-spinner/loading-spinner.component";
import { AuthService } from '../../../services/auth.service';
import { switchMap, EMPTY } from 'rxjs';

@Component({
  selector: 'app-home-product-detail',
  imports: [DecimalPipe, LoadingSpinnerComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {

  private productService = inject(ProductService);
  private authService = inject(AuthService);

  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private notification = inject(NotificationService);
  public Math = Math;


  // Signals
  quantity = signal(1);

  cart = this.cartService.cart;

  productId = computed(() => {
    return Number(this.route.snapshot.paramMap.get('id'));
  });

  productResource = rxResource<ProductResponse, void>({
    stream: () => {
      const id = this.productId();
      // Si el ID es inválido, no hacer la petición
      if (!id || id <= 0 || isNaN(id)) {
        return EMPTY;
      }
      return this.productService.getProductById(id);
    }
  });

  product = computed(() => {
    return this.productResource.value()
  });

  error = computed(() => this.productResource.error());
  isLoading = computed(() => this.productResource.isLoading());

  isAuthenticated = this.authService.isAuthenticated;

  canAddMore = computed(() => {
  const product = this.product();
  if (!product) return false;

  return this.productQuantityInCart() < product.stock;
});


  productQuantityInCart = computed(() => {
    const cart = this.cart();
    const product = this.product();

    if (!cart || !product) return 0;

    const item = cart.cartItemsResponse.find(
      i => i.productResponse.id === product.id
    );

    return item?.quantity ?? 0;
  });

  canAddSelectedQuantity = computed(() => {
  const product = this.product();
  if (!product) return false;

  return (
    this.productQuantityInCart() + this.quantity()
  ) <= product.stock;
});


  // CartService actions
  isAddingToCart = signal(false); // for handling cart adding

  addToCart() { // I can implement exhaustMap pipe here, in other moment
    if (this.isAddingToCart()) return;

    const product = this.product();
    if (!product) return;

    this.isAddingToCart.set(true);

    this.cartService.addToCart(product.id, this.quantity());
  }

  // Quantity handling

  increase() {
    this.quantity.set(this.clampQuantity(this.quantity() + 1));
  }

  decrease() {
    if(this.quantity() > 1){
      this.quantity.set(this.clampQuantity(this.quantity() - 1));
    }
    else{
      this.quantity.set(0);
    }
  }

  setQuantity(value: number) {
    this.quantity.set(this.clampQuantity(value));
  }

  private clampQuantity(value: number) {
    const stock = this.product()!.stock;
    return Math.min(Math.max(1, value), stock);
  }


  showAuth(){
    // Authentication check - currently used for debugging
    return this.authService.isAuthenticated;
  }

}
