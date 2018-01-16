import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
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
         return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
   }

   getImageFromAssets(id: string): Observable<any> {
      let url = `${API_CONFIG.imgBaseUrl}/cp${id}.jpg`
      return this.http.get(url, {responseType: 'blob'});
   }

   inserir(cliente: ClienteDTO){
         return this.http.post(
				`${API_CONFIG.baseUrl}/clientes`,
            cliente,
            {
               observe: 'response', responseType: 'text'
         	}
      	)
   } 
}