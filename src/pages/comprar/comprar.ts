import { CompraService } from './../../services/compra.service';
import { ItemCompraPage } from './../item-compra/item-compra';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html',
  providers: [CompraService]
})
export class ComprarPage {
  mercado: Mercado;
  compra: Compra;
  itens: ItemCompra[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private compraService: CompraService) {
    this.mercado = this.navParams.get('mercado');
  }

  ionViewDidLoad() {
    console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    console.log(this.compra);
  }

  public onNovoItem(): void {
    this.navCtrl.push(ItemCompraPage, { compra: this.compra })
  }

}
