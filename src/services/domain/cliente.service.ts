import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { StorageService } from '../storage.service';

import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';

@Injectable()
export class ClienteService {

   constructor(
      public http: HttpClient,
      public storageService: StorageService
   ) {}

   findByEmail(email: string): Observable<ClienteDTO> {

      let token = this.storageService.getLocalUser().token;
         return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
   }

   getImageFromAssets(id: string): string {
      let url = `${API_CONFIG.imgBaseUrl}/cp${id}.jpg`
      return url;
   }
}