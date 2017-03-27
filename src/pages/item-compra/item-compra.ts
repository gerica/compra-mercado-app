import { CompraService } from './../../services/compra.service';
import { MercadoSerice } from './../../services/mercado.service';
import { BasePage } from './../base';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-item-compra',
  templateUrl: 'item-compra.html',
  providers: [CompraService, MercadoSerice]
})
export class ItemCompraPage extends BasePage {
  compra: Compra;
  itemCompra = new ItemCompra();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private compraService: CompraService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private mercadoService: MercadoSerice) {
    super(loadingCtrl, toastCtrl)
    this.compra = this.navParams.get('compra');
  }

  ionViewDidLoad() {
    console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.createLoading('Gravando...');
    this.compraService.addItem(this.itemCompra, this.compra).subscribe(
      (result: string) => {
        this.mercadoService.comprandoMercado(this.compra.mercado);
        this.loading.dismiss();
        this.createToast(result);
        this.navCtrl.pop();
      }
    );
    // this.itemService.addItem(this.itemCompra);
    // this.itemService.itemSub.subscribe(
    //   (result: string) => {
    //     this.mercadoService.comprandoMercado(this.compra.mercado);
    //     this.loading.dismiss();
    //     this.createToast(result);
    //     this.navCtrl.pop();
    //   }
    // )
  }

}
