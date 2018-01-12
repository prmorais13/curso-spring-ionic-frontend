import { StorageService } from './../services/storage.service';
import { Injectable } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

   constructor(
      public storageService: StorageService
   ){ }

   public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      let localUser = this.storageService.getLocalUser();
      if (localUser) {
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