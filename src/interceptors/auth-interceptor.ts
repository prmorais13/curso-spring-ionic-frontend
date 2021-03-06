import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

import { API_CONFIG } from '../config/api.config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(
      public storageService: StorageService
   ){ }

   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let localUser = this.storageService.getLocalUser();

      let N = API_CONFIG.baseUrl.length;
      let requestToApi = req.url.substring(0, N) == API_CONFIG.baseUrl;

      if (localUser && requestToApi) {
         const authReq = req.clone({headers: req.headers.set('Authorization', `Bearer ${localUser.token}`)});
         return next.handle(authReq);
      }
      else {
         return next.handle(req);
      }
   };  
};

export const AuthInterceptorProvider = {
   provide: HTTP_INTERCEPTORS,
   useClass: AuthInterceptor,
   multi: true
};