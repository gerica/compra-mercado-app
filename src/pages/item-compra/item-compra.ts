import { MercadoSerice } from './../../services/mercado.service';
import { BasePage } from './../base';
import { ItemCompraService } from './../../services/item-compra.service';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-item-compra',
  templateUrl: 'item-compra.html',
  providers: [ItemCompraService, MercadoSerice]
})
export class ItemCompraPage extends BasePage {
  compra: Compra;
  itemCompra = new ItemCompra();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private itemService: ItemCompraService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private mercadoService: MercadoSerice) {
    super(loadingCtrl, toastCtrl)
    this.compra = this.navParams.get('compra');
    this.itemCompra.compra = this.compra;
  }

  ionViewDidLoad() {
    console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
    // this.createLoading('Adicionando...');
    // this.itemService.addItem(this.itemCompra);
    // this.loading.dismiss();
    // this.createToast('Adcionando com sucesso.');
    // this.navCtrl.pop();

    event.preventDefault();
    this.createLoading('Gravando...');
    this.itemService.addItem(this.itemCompra);
    this.itemService.itemSub.subscribe(
      (result: string) => {
        this.mercadoService.comprandoMercado(this.itemCompra.compra.mercado);
        this.loading.dismiss();
        this.createToast(result);
        this.navCtrl.pop();
      }
    )
  }

}
