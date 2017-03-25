import { ItemCompraService } from './../../services/item-compra.service';
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
  providers: [CompraService, ItemCompraService]
})
export class ComprarPage {
  mercado: Mercado;
  compra: Compra;
  itens: ItemCompra[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private compraService: CompraService,
    private itemService: ItemCompraService) {
    this.mercado = this.navParams.get('mercado');
  }

  ionViewDidLoad() {
    console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    this.getItens();
  }

  public onNovoItem(): void {
    this.navCtrl.push(ItemCompraPage, { compra: this.compra })
  }

  private getItens() {
    this.itens = this.itemService.getItens(this.compra);
    console.log(this.itens);
  }


}
