import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  enderecos: EnderecoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) { }

  ionViewDidLoad() {
    this.enderecos = [
      {
        id: '1',
        logradouro: 'Rua Parque Paraúna',
        numero: '79',
        complemento: '',
        bairro: 'Nova Esperança',
        cep: '59144170',
        cidade: {
          id: '1',
          nome: 'Paranamirim',
          estado: {
            id: '2',
            nome: 'Rio Grande do Norte'
          }
        }
      },
      {
        id: '2',
        logradouro: 'Rua Praia de Santa Rita',
        numero: '13',
        complemento: '',
        bairro: 'Nova Parnamirim',
        cep: '59144170',
        cidade: {
          id: '2',
          nome: 'Natal',
          estado: {
            id: '2',
            nome: 'Rio Grande do Norte'
          }
        }
      }
    ]
  }

}
