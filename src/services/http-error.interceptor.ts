import { Injectable, Injector, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { RollbarErrorHandlerService } from '../services/rollbar-error-handler.service';
import { retry, catchError, tap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { CacheMapService } from 'src/cache/cache-map.service';
import { environment } from './../environments/environment';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  rollbarService: RollbarErrorHandlerService;
   url = environment.API_ENDPOINT;

  constructor(private injector: Injector,
    @Inject(DOCUMENT) private document: Document,
    private cache: CacheMapService) {
    // inject Rollbar service dependency at this poin to avoid cricular dependency issue
    this.rollbarService = this.injector.get(RollbarErrorHandlerService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const flag=request.method==='GET';
    // authorization header in http request
    if (localStorage.getItem('token') !== null || request.headers.get('Authorization') === null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }
    if(flag &&  this.cache.get(request)!==null){
      return of(this.cache.get(request));
    }
    if(request.method !== 'GET'){
      this.cache.deleteExpiredCache(true);
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if(flag){
          this.cache.put(request, event);
          }
        }
     }),
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
