import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { LoggingService } from "../../services/logging.service";

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const loggingService = inject(LoggingService);
  loggingService.debug(`HTTP Request: ${req.method} ${req.url}`, 'HttpInterceptor');
  return next(req);
}
