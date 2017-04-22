import { ItemCompra } from './../../../modelo/item-compra';
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
    this.ordenarListaItens();;
  }

  public dismiss(acao: string) {
    this.viewCtrl.dismiss({ acao: acao });
  }

  private ordenarListaItens(): void {
    this.listaComprar.itens.sort((a: ItemCompra, b: ItemCompra) => {
      if (a.nome > b.nome) {
        return 1;
      } else if (a.nome < b.nome) {
        return -1;
      }
      return 0;
    });
  }

}
