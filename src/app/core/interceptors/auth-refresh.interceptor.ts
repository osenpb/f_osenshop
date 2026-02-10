import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

// Simple flag to prevent multiple simultaneous refresh attempts
let isRefreshing = false;

export function authRefreshInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);

  // Skip interceptor for auth endpoints
  const authEndpoints = [
    '/api/v1/auth/login',
    '/api/v1/auth/register',
    '/api/v1/auth/refresh-token'
  ];

  const isAuthEndpoint = authEndpoints.some(endpoint => req.url.includes(endpoint));

  if (isAuthEndpoint) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Only handle 401 errors
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // If user is not authenticated, don't try to refresh
      if (!authService.isAuthenticated()) {
        return throwError(() => error);
      }

      // If refresh is already in progress, just re-throw the error
      // The request will fail, but won't cause multiple refresh attempts
      if (isRefreshing) {
        return throwError(() => error);
      }

      // Start refresh process
      isRefreshing = true;

      return authService.refreshToken().pipe(
        switchMap(() => {
          isRefreshing = false;
          // Retry the original request with new token
          const newToken = authService.token();
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${newToken}`)
          });
          return next(clonedRequest);
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          // If refresh fails, the user has already been logged out by refreshToken()
          return throwError(() => error);
        })
      );
    })
  );
}