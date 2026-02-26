import { ChangeDetectionStrategy, Component, inject, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { CheckoutStateService } from '../../../../services/checkout-state.service';
import { LoggingService } from '../../../../services/logging.service';


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
  private loggingService = inject(LoggingService);
  readonly user = this.authService.user;
  private checkoutState = inject(CheckoutStateService);

  readonly form = this.fb.nonNullable.group({
    shippingAddress: ['', [Validators.required, Validators.minLength(10)]]
  });

  constructor() {

    this.loggingService.debug(`CheckoutComponent - form.valid inicial: ${this.form.valid}`, 'CheckoutComponent');
    this.checkoutState.setCheckoutFormValid(this.form.valid);

    this.form.statusChanges.subscribe(() => {
      this.loggingService.debug(`statusChanges - form.valid: ${this.form.valid}, form.value: ${JSON.stringify(this.form.value)}`, 'CheckoutComponent');
      this.checkoutState.setCheckoutFormValid(this.form.valid);
      this.cdr.markForCheck();
    });

    this.form.valueChanges.subscribe(value => {
      if (value.shippingAddress) {
        this.checkoutState.setShippingAddress(value.shippingAddress);
      }
    });
  }
}
