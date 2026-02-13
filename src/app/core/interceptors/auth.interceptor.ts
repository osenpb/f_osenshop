import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';

// Variables para manejar la "cola" de peticiones (fuera de la función para persistir estado)
let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si el error no es 401, lo dejamos pasar
      if (error.status !== 401 || req.url.includes('/auth/login')) {
        return throwError(() => error);
      }

      // Si ya hay un proceso de refresh en marcha, esperamos
      if (isRefreshing) {
        return refreshTokenSubject.pipe(
          filter(result => result !== null), // Esperamos a que el proceso termine
          take(1),                           // Solo tomamos el primer valor (éxito)
          switchMap(() => next(req))         // Reintentamos la petición original
        );
      }

      isRefreshing = true;
      refreshTokenSubject.next(null); // Limpiamos el estado del subject

      return authService.refreshToken().pipe(
        switchMap((user) => {
          isRefreshing = false;
          refreshTokenSubject.next(user); // Notificamos a las peticiones en cola
          return next(req);               // Reintentamos la petición original
        }),
        catchError((refreshError) => {
          isRefreshing = false;
          authService.logoutLocal();      // Si el refresh falla, limpiamos todo
          return throwError(() => refreshError);
        })
      );
    })
  );
};
