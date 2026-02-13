import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserResponse } from '../auth/interfaces/user-response.interface';
import { RegisterRequest } from '../auth/interfaces/register-request.interface';
import { LoginRequest } from '../auth/interfaces/login-request.interface';


export type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private http = inject(HttpClient);

  // === ESTADO PRIVADO (Signals) ===

  private _user = signal<UserResponse | null>(null);
  private _authStatus = signal<AuthStatus>('checking');

  // === ESTADO PÚBLICO (Read-only) ===
  public user = computed(() => this._user());
  public authStatus = computed(() => this._authStatus());

  public isAuthenticated = computed(() =>
    this._authStatus() === 'authenticated' && !!this._user()
  );

  constructor() {
    // Esto se ejecuta una vez al iniciar la App
    this.checkStatus().subscribe();
  }

  // === MÉTODOS DE ACCIÓN ===

  login(loginRequest: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap(user => this.setAuthentication(user)),
        catchError((error: HttpErrorResponse) => {
          const message = error.status === 403
            ? 'Credenciales incorrectas'
            : 'Error de conexión con el servidor';
          return throwError(() => new Error(message));
        })
      );
  }

  register(registerRequest: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, registerRequest)
      .pipe(tap(user => this.setAuthentication(user)));
  }

  /**
   *  Pregunta al servidor quién es el dueño de la cookie.
   */
  checkStatus(): Observable<boolean> {
    this._authStatus.set('checking');

    return this.http.get<UserResponse>(`${this.baseUrl}/check-status`)
      .pipe(
        tap(user => this.setAuthentication(user)),
        map(() => true),
        catchError(() => {
          this.logoutLocal();
          return of(false);
        })
      );
  }

  logout(): void {
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
      next: () => this.logoutLocal(),
      error: () => this.logoutLocal() // Limpiamos local igual aunque falle el red
    });
  }


  refreshToken(): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/refresh`, {})
    .pipe(
      tap(user => this.setAuthentication(user)),
      catchError(error => {
        console.error('Error en la rotación de tokens:', error);
        return throwError(() => error);
      })
    );
}

  // === AYUDANTES PRIVADOS ===

  private setAuthentication(user: UserResponse): void {
    this._user.set(user);
    this._authStatus.set('authenticated');
  }

  public logoutLocal(): void {
    this._user.set(null);
    this._authStatus.set('not-authenticated');
  }
}
