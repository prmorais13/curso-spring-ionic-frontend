import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { VALID } from '@angular/forms/src/model';
//import { makeDecorator } from '@angular/core/src/util/decorators';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { ClienteService } from '../../services/domain/cliente.service';

import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fb: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController
  ) { 
    this.formGroup = fb.group({
      nome: ['Paulo Roberto',
            [Validators.required, Validators.minLength(5), Validators.maxLength(120)]
      ],
      email: ['prmorais_13@hotmail.com', 
             [Validators.required, Validators.email]
      ],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['39135810491',
                 [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['Paulo13', [Validators.required]],
      logradouro: ['Rua Parque Paraúna', [Validators.required]],
      numero: ['79', [Validators.required]],
      complemento: ['', []],
      bairro: ['Nova Esperança', [Validators.required]],
      cep: ['59144170', [Validators.required]],
      telefone1: ['987015547', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });

  }

  ionViewDidLoad() {
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
        error => {}
      );
  }

  updateCidades(): any {
    this.cidadeService.findAll(this.formGroup.value.estadoId)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error => {}
    );
  }

  signupUser() {
    this.clienteService.inserir(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
      error => {}
      )
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Cadastro realizado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}
