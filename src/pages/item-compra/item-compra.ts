import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-item-compra',
  templateUrl: 'item-compra.html'
})
export class ItemCompraPage {
  compra: Compra;
  itemCompra = new ItemCompra();

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
    this.compra = this.navParams.get('compra');
    this.itemCompra.compra = this.compra;
  }

  ionViewDidLoad() {
    console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
  }

}
