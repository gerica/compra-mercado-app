import { CompraService } from './../../../services/compra.service';
import { ItemCompra } from './../../../modelo/item-compra';
import { Compra } from './../../../modelo/compra';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-modal-lista-item',
  templateUrl: 'modal-lista-item.html',
  providers: [CompraService]
})
export class ModalListaItemPage {
  compra: Compra;
  itens: ItemCompra[] = [];
  totalValor: number;
  totalItens: number;

  constructor(public navParams: NavParams,
    public viewCtrl: ViewController,
    private compraService: CompraService) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalListaItemPage');
    this.compra = this.navParams.get('compra');
    this.itens = this.compra.itens;
    const totalObj: any = this.compraService.calcularTotais(this.itens);
    this.totalItens = totalObj.totalItens;
    this.totalValor = totalObj.totalValor;
  }

  public dismiss(acao: string) {
    this.viewCtrl.dismiss();
  }

}
