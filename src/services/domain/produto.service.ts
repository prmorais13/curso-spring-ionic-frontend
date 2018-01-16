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

   findByCategoria(categoria_id: string) {
      return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}`);
   }

   findById(produto_id: string): Observable<ProdutoDTO> {
      return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
   }

   getImageFromAssets(id: string): Observable<any> {
      let url = `${API_CONFIG.imgBaseUrl}/prod${id}-small.jpg`
      return this.http.get(url, {responseType: 'blob'});
   }

   getImageProdFromAssets(id: String): Observable<any> {
      let url = `${API_CONFIG.imgBaseUrl}/prod${id}.jpg`
      return this.http.get(url, {responseType: 'blob'}); 
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