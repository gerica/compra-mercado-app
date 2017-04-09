import { ListaComprar } from './../../../modelo/lista-compar';
import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

export const ACOES = ['EDITAR'];

@Component({
  selector: 'page-modal-lista-comprar-item',
  templateUrl: 'modal-lista-comprar-item.html'
})
export class ModalListaComprarItemPage {
  listaComprar: ListaComprar;
  acoes = ACOES;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.listaComprar = this.navParams.get('listaComprar');
  }

  public dismiss(acao: string) {
    this.viewCtrl.dismiss({ acao: acao });
  }

}
