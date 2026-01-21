import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, signal } from '@angular/core';

import { OrderFormRequest } from '../../interfaces/order-form-request.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services/auth.service';
import { CartService } from '../../../services/cart.service';
import { NotificationService } from '../../../services/notification.service';
import { SuccessModalOrderComponent } from "../success-modal-order.component/success-modal-order.component";

@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule, SuccessModalOrderComponent],
  templateUrl: './checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  private orderService = inject(OrderService);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  private notificationService = inject(NotificationService);

  private fb = inject(FormBuilder)
  private router = inject(Router);
  readonly user = this.authService.user;

  showSuccessModal = signal(false);


  cart = this.cartService.cart;

  order: OrderFormRequest = {
    shippingAddress: ''
  };


  readonly form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]]
  });


  onSubmit() {
    if (this.form.invalid) return;
    this.orderService.createOrder(this.form.getRawValue())
    .subscribe({
      next: () => {
        this.cartService.cartResource.reload();

        this.showSuccessModal.set(true);

        setTimeout(() => {
          this.router.navigate(['/home/index']);
        }, 4000);
      },
      error: (error) => {
        this.notificationService.error('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
      }
    });
  }
}
