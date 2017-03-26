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
  totalItens: number;
  totalValor: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private compraService: CompraService,
    private itemService: ItemCompraService) {
    this.mercado = this.navParams.get('mercado');
  }


  ionViewWillEnter() {
    console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    this.getItens();
    this.calcularTotais();
  }

  public onNovoItem(): void {
    this.navCtrl.push(ItemCompraPage, { compra: this.compra })
  }

  private getItens() {
    this.itens = this.itemService.getItens(this.compra);
    console.log(this.itens);
  }

  private calcularTotais(): void {
    this.totalItens = 0;
    this.totalValor = 0;
    for (let i of this.itens) {
      this.totalItens = this.totalItens + parseInt(i.quantidade+'');
      this.totalValor += i.valor * parseInt(i.quantidade+'');
    }
  }



  // ionViewDidLoad() {
  // }
  // ionViewCanEnter(): void {
  //   console.log('ionViewCanEnter');
  // }

  // ionViewDidLog() {
  //   console.log('ionViewDidLog');
  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewCanLeave(): void {
  //   console.log('ionViewCanLeave');
  // }


}
