import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-lista-compra',
  templateUrl: 'lista-compra.html'
})
export class ListaCompraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.clear();
    console.log('ionViewDidLoad ListaCompraPage');
  }

}
