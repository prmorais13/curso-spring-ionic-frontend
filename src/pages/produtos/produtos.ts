import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProdutoService } from '../../services/domain/produto.service';

import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items: ProdutoDTO[];
  imgUrl = API_CONFIG.imgBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService
  ) { }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        nome: "Mouse",
        preco: 80.99
      },
      {
        id: "2",
        nome: "Teclado",
        preco: 100.000
      }
    ]

    // this.getImageExist();
  }

 /*  getImageExist() {
    for(let produto of this.items) {

    }
    return this.produto.imagemUrl = this.produtoService.getImageFromAssets(this.produto.id);
 } */

}
