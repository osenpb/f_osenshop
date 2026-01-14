import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../auth/interfaces/user-response.interface';
import { RegisterRequest } from '../auth/interfaces/register-request.interface';
import { LoginRequest } from '../auth/interfaces/login-request.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponse } from '../auth/interfaces/auth-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // API base url
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  // HttpClient
  private http = inject(HttpClient);

  // === PRIVATE STATES ===
  private _user = signal<UserResponse | null>(null);
  private _authStatus = signal<AuthStatus>('checking');
  private _token = signal<string | null>(localStorage.getItem('token'));


  // === PUBLIC STATES ===
  authStatus = computed(() => {
    if (this._authStatus() === 'checking') return 'checking';
    if (this._user()) return 'authenticated';
    else return 'not-authenticated';
  });

  isAuthenticated = computed(() => this._authStatus() === 'authenticated');
  user = computed<UserResponse | null>(() => this._user());
  token = computed<string | null>(() => this._token());

  checkStatusResource = rxResource({
    stream: () => this.checkStatus(),
  });


  register(registerRequest: RegisterRequest) {
    return this.http.post<UserResponse>(`${this.baseUrl}/register`, registerRequest);
  }

  login(loginRequest: LoginRequest) {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, loginRequest)
      .pipe(
        tap(resp => this.handleAuthSuccess(resp)),
        catchError((error: HttpErrorResponse) => {
          let message = 'Error al iniciar sesión';

          if (error.status === 403) {
            message = 'El correo o la contraseña no son correctos';
          } else if (error.status === 0) {
            message = 'No se pudo conectar con el servidor';
          }

          return throwError(() => new Error(message));
        })
      );
  }

  me() {
    return this.http.get<UserResponse>(`${this.baseUrl}/me`)
      .pipe(
        tap((user: UserResponse) => {
          this._user.set(user);
        }
        ),
      );
  }

  logout() {
    this._user.set(null);
    this._token.set(null);
    this._authStatus.set('not-authenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  // check if there is a token in local storage and validate it
  checkStatus(): Observable<boolean> {

    //const token = localStorage.getItem('token');
    const token = this._token();

    if (!token) {
      this._authStatus.set('not-authenticated');
      this.logout();
      return of(false);
    }

    return this.http
      .get<AuthResponse>(`${this.baseUrl}/check-status`)
      .pipe(
        tap(resp => this.handleAuthSuccess(resp)),
        map(() => true),
        catchError((error: any) => this.handleError(error))
      );
  }

  private handleError(error: any) {
    this.logout();
    return of(false);
  }

  private handleAuthSuccess(resp: AuthResponse): boolean {

    const accessToken = resp.tokens.accessToken;

    this._token.set(accessToken);
    this._user.set(resp.user);
    this._authStatus.set('authenticated');
    // SAVE TOKENS
    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', resp.tokens.refreshToken); // despues refresh-token
    return true;
  }
}
