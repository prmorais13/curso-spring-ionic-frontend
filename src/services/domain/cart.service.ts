import { Injectable } from "@angular/core";

import { StorageService } from '../storage.service';

import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";

@Injectable()
export class CartService {

   constructor(
      public storageService: StorageService
   ) {}
   
   createOrClearCart(): Cart {
      let cart: Cart = {items: []};
      this.storageService.setCart(cart);
      return cart;
   }

   getCart(): Cart {
      let cart = this.storageService.getCart();
      if (cart === null) {
         cart = this.createOrClearCart();
      }
      return cart;
   }

   addProduto(produto: ProdutoDTO): Cart {
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.produto.id === produto.id);
      if (position === -1) {
         cart.items.push({ quantidade: 1, produto: produto });
      }
      this.storageService.setCart(cart);
      return cart;
   }

   removeProduto(produto: ProdutoDTO): Cart {
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.produto.id === produto.id);
      if (position !== -1) {
         cart.items.splice(position, 1);
      }
      this.storageService.setCart(cart);
      return cart;
   }

   increaseQuantity(produto: ProdutoDTO): Cart {
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.produto.id === produto.id);
      if (position !== -1) {
         cart.items[position].quantidade++;
      }
      this.storageService.setCart(cart);
      return cart;
   }

   decreaseQuantity(produto: ProdutoDTO): Cart {
      let cart = this.getCart();
      let position = cart.items.findIndex(x => x.produto.id === produto.id);
      if (position !== -1) {
         cart.items[position].quantidade--;
         if (cart.items[position].quantidade < 1) {
            cart = this.removeProduto(produto);
         }
      }
      this.storageService.setCart(cart);
      return cart;
   }
   
   total(): number {
      let cart = this.getCart();
      let sum = 0;

      for (let obj of cart.items) {
         sum += obj.produto.preco * obj.quantidade;
      }
      return sum;
   }

}