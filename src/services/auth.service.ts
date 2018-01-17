import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { JwtHelper } from 'angular2-jwt';

import { StorageService } from './storage.service';
import { CartService } from "./domain/cart.service";

import { CredenciaisDTO } from '../models/credenciaisDTO';
import { API_CONFIG } from '../config/api.config';
import { LocalUser } from '../models/local_user';

@Injectable()
export class AuthService {

   jwtHelper: JwtHelper = new JwtHelper();

   constructor(
      public http: HttpClient,
      public storageService: StorageService,
      public cartService: CartService
   ){ }

   authenticate(creds: CredenciaisDTO) {
      return this.http.post(`${API_CONFIG.baseUrl}/login`,
                              creds, 
                              {observe: 'response', responseType: 'text'}
                           );
   }

   refreshToken() {
      return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {},
                              {observe: 'response', responseType: 'text'}
                           );
   }
   
   successfulLogin(authorizationValue: string) {
      let tokenUser = authorizationValue.substring(7);
      let user: LocalUser = {
         token: tokenUser,
         email: this.jwtHelper.decodeToken(tokenUser).sub
      };
      this.storageService.setLocalUser(user);
      this.cartService.createOrClearCart();
   }

   logout() {
      this.storageService.setLocalUser(null);
   }
   
}