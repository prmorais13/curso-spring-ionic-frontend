import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CategoriaService } from '../../services/domain/categoria.service';
import { ProdutoService } from '../../services/domain/produto.service';

import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  imgUrl = API_CONFIG.imgBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public produtoService: ProdutoService
  ) { }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
  }

  showProdutos(categoria_id: string) {     
      this.navCtrl.push('ProdutosPage', { categoria_id: categoria_id });
  }

}
