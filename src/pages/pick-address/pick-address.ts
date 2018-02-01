import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';

import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[];
  pedido: PedidoDTO

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService
  ) { }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.enderecos = response['enderecos'];
          
          let cart = this.cartService.getCart();

          this.pedido = {
            cliente: { id: response['id']},
            enderecoDeEntrega: null,
            pagamento: null,
            itens: cart.items.map(x => {
                return {
                  quantidade: x.quantidade,
                  produto: {
                    id: x.produto.id
                  }
                }
              })
          }
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        });
    }
    else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(end: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {
      id: end.id 
    };
    
    this.navCtrl.push('PaymentPage', { pedido: this.pedido });
  }

}
