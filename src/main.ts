import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => {
    // Bootstrap error - in production, consider implementing error reporting service
    // For now, error is handled by Angular's default error handling
  });
