import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CheckoutStateService } from '../../../../services/checkout-state.service';


@Component({
  selector: 'app-checkout-form',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  readonly user = this.authService.user;
  private checkoutState = inject(CheckoutStateService);

  readonly form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {

    // estado inicial
    console.log('CheckoutComponent - form.valid inicial:', this.form.valid);
    this.checkoutState.setCheckoutFormValid(this.form.valid);

    // detectar cambios de validez
    this.form.statusChanges.subscribe(() => {
      console.log('statusChanges - form.valid:', this.form.valid, 'form.value:', this.form.value);
      this.checkoutState.setCheckoutFormValid(this.form.valid);
      this.cdr.markForCheck();
    });

    // solo para guardar la dirección
    this.form.valueChanges.subscribe(value => {
      if (value.shippingAddress) {
        this.checkoutState.setShippingAddress(value.shippingAddress);
      }
    });
  }
}
