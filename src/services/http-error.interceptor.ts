import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RollbarErrorHandlerService } from '../services/rollbar-error-handler.service';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  rollbarService: RollbarErrorHandlerService;

  constructor(private injector: Injector) {
    // inject Rollbar service dependency at this poin to avoid cricular dependency issue
    this.rollbarService = this.injector.get(RollbarErrorHandlerService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.rollbarService.handleError(new Error(error.message));
        return throwError(errorMessage);
      })
    )
  }
}
