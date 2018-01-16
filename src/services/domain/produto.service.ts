import { Injectable } from "@angular/core";
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/RX';

import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

   constructor(
      public http: HttpClient
   ) {}

   getImageFromAssets(id: string): string {
      let url = `${API_CONFIG.imgBaseUrl}/prod${id}-small.jpg`
      return url;
   }

   inserir(produto: ProdutoDTO){
         return this.http.post(
				`${API_CONFIG.baseUrl}/produtos`,
            produto,
            {
               observe: 'response', responseType: 'text'
         	}
      	)
   } 
}