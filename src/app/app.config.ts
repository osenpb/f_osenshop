
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, ErrorHandler } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors, withXsrfConfiguration } from '@angular/common/http';



import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';
import { GlobalErrorHandler } from './core/error-handler/global-error.handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      // withXsrfConfiguration({
      //   cookieName: 'XSRF-TOKEN',
      //   headerName: 'X-XSRF-TOKEN',
      // }), Esto ya no tiene utilidad xq ya no usas CSRF
      //withFetch(),
      withInterceptors([
        credentialsInterceptor,
      ]
    )),
    provideCharts(withDefaultRegisterables()),
    { provide: ErrorHandler, useClass: GlobalErrorHandler }],
};
