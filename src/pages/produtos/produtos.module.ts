import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ProdutosPage } from './produtos';

import { ProdutoService } from '../../services/domain/produto.service';

@NgModule({
  declarations: [
    ProdutosPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosPage),
  ],
  providers: [
    ProdutoService
  ]
})
export class ProdutosPageModule {}
