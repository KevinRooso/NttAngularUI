import { Injectable, Injector, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { RollbarErrorHandlerService } from '../services/rollbar-error-handler.service';
import { retry, catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  rollbarService: RollbarErrorHandlerService;

  constructor(private injector: Injector, @Inject(DOCUMENT) private document: Document) {
    // inject Rollbar service dependency at this poin to avoid cricular dependency issue
    this.rollbarService = this.injector.get(RollbarErrorHandlerService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // authorization header in http request
    if (localStorage.getItem('token') !== null || request.headers.get('Authorization') === null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        // if token expired
        if (error.status === 401) {
          if (this.document.location.pathname !== '/login') {
            this.document.location.href = '/login';
          }
        }
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // tslint:disable-next-line:no-console
        console.log(errorMessage);
        this.rollbarService.handleError(error);
        return throwError(error);
      })
    );
  }
}
