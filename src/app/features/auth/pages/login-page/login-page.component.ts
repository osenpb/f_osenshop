import { FormUtils } from '../../../../helpers/utils';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-page.component',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  loading = signal(false);

  private fb = inject(FormBuilder)
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');


  //Helper to valite form fields
  formUtils = FormUtils;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.loading.set(true);

    this.authService.login(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.loading.set(false)
          if (this.authService.user()?.role === "ROLE_ADMIN") {
            this.router.navigate(['/admin/dashboard']);

          } else if (this.authService.user()?.role === "ROLE_USER") {
            this.router.navigate(['/home/index']);

          }
        },
        error: (err) => {
          this.loading.set(false)
          this.errorMessage.set(err.message);
        }
      }
      );
  }

}
