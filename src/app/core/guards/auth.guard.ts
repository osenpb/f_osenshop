import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter, map, switchMap, take } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

export const authGuard = (allowedRoles: ('ROLE_USER' | 'ROLE_ADMIN')[]) => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Si ya tenemos un estado definitivo, respondemos de inmediato
    if (authService.authStatus() !== 'checking') {
      return resolveAccess(authService, router, allowedRoles);
    }

    // Si está en 'checking', esperamos a que se resuelva
    return toObservable(authService.authStatus).pipe(
      filter(status => status !== 'checking'),
      take(1),
      map(() => resolveAccess(authService, router, allowedRoles))
    );
  };
};

function resolveAccess(
  authService: AuthService,
  router: Router,
  allowedRoles: ('ROLE_USER' | 'ROLE_ADMIN')[]
): boolean | ReturnType<Router['createUrlTree']> {
  const user = authService.user();

  if (!authService.isAuthenticated() || !user) {
    return router.createUrlTree(['/auth/login']);
  }

  if (!allowedRoles.includes(user.role)) {
    const redirect = user.role === 'ROLE_ADMIN' ? '/admin' : '/';
    return router.createUrlTree([redirect]);
  }

  return true;
}
