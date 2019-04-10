import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    private readonly notifier: NotifierService;
    constructor(notifierService: NotifierService) { this.notifier = notifierService;}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const userData: string = localStorage.getItem('userData');
        let   modifiedUrl = request.clone({
            url: request.url
      });
        // console.log(userData);
      if(request.url.includes("http")==false)
      {  if (userData) {
            const jsonUserData = JSON.parse(userData);
            if(jsonUserData){
                request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + jsonUserData.apiToken) });
            }
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        //request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        modifiedUrl = request.clone({
		  	url: environment.BASE_API_URL + request.url
		});
    }
    
        return next.handle(modifiedUrl).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error ? error.error : '',
                    status: error.status
                };
                
                return throwError(error);
            }));
    }
}
