import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const authGuard = (allowedRoles: ('ROLE_USER' | 'ROLE_ADMIN')[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const isAuthenticated = authService.isAuthenticated();
    const user = authService.user();

    if (!isAuthenticated || !user) {
      router.navigate(['/auth/login']);
      return false;
    }

    if (!allowedRoles.includes(user.role)) {
      // Redirect based on user role
      if (user.role === 'ROLE_ADMIN') {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/']);
      }
      return false;
    }

    return true;
  };
};
