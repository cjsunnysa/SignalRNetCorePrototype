import { Injectable, Inject } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BaseHrefInterceptor implements HttpInterceptor {
    constructor(@Inject('BASE_URL') private _baseUrl: string) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({ url: `${this._baseUrl}${req.url}` });
        return next.handle(apiReq);
    }
}
