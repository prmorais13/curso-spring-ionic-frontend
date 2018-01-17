import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartItem } from '../../models/cart-item';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';

import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService
  ) { }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.getImageExist();
  }

  getImageExist() {
    for(let item of this.items) {
      this.produtoService.getImageFromAssets(item.produto.id)
        .subscribe(response => {
          item.produto.imagemUrl = `${API_CONFIG.imgBaseUrl}/prod${item.produto.id}-small.jpg`
        },
        error => {})
    }
  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }
  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  textButton(): string {
    if (this.total() <= 0) {
      return "Iniciar compras";
    } 
    else {
      return "Continuar comprando"
    }
  }

}
