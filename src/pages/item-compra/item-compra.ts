import { BasePage } from './../base';
import { ItemCompraService } from './../../services/item-compra.service';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-item-compra',
  templateUrl: 'item-compra.html',
  providers: [ItemCompraService]
})
export class ItemCompraPage extends BasePage {
  compra: Compra;
  itemCompra = new ItemCompra();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private itemService: ItemCompraService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController) {
    super(loadingCtrl, toastCtrl)
    this.compra = this.navParams.get('compra');
    this.itemCompra.compra = this.compra;
  }

  ionViewDidLoad() {
    console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.createLoading('Adicionando...');
    this.itemService.addItem(this.itemCompra);
    this.loading.dismiss();
    this.createToast('Adcionando com sucesso.');
    this.navCtrl.pop();
  }

}
