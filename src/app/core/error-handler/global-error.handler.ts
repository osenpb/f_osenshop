import { ErrorHandler, inject } from '@angular/core';
import { LoggingService } from '../../services/logging.service';

export class GlobalErrorHandler implements ErrorHandler {
  private loggingService = inject(LoggingService);

  handleError(error: Error | unknown): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const stack = error instanceof Error ? error.stack : undefined;

    this.loggingService.error(
      `Unhandled error: ${errorMessage}`,
      error,
      'GlobalErrorHandler'
    );

    if (stack) {
      this.loggingService.debug(`Stack trace: ${stack}`, 'GlobalErrorHandler');
    }

    throw error;
  }
}
