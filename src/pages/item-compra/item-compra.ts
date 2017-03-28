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
    // console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.createLoading('Gravando...');
    if (this.validarForm()) {
      this.converterMumeros();
      this.compraService.addItem(this.itemCompra, this.compra).subscribe(
        (result: string) => {
          this.mercadoService.comprandoMercado(this.compra.mercado);
          this.loading.dismiss();
          this.createToast(result);
          this.navCtrl.pop();
        }
      );
    }
  }

  private validarForm(): boolean {
    if (!this.itemCompra.quantidade) {
      this.loading.dismiss();
      this.createToastCloseButton('A quantidade é obrigatório.')
      return false;
    }

    // if (this.itemCompra.valor.toString().match(/^\d+$/)) {
    //   return true;
    // } else if (this.itemCompra.valor.toString().match(/^\d+\.\d+$/)) {
    //   return true;
    // } else if (this.itemCompra.valor.toString().match(/^\d+\,\d+$/)) {
    //   let valorTemp = this.itemCompra.valor.toString().replace(',', '.');
    //   console.log(valorTemp);
    //   this.itemCompra.valor = parseFloat(valorTemp);
    //   return true;
    // }


    //   if (!isNaN(this.itemCompra.valor)) {
    //     let valorTemp = this.itemCompra.valor.toString().replace(',', '.');
    //     this.itemCompra.valor = parseInt(valorTemp);

    //   }
    if (!this.itemCompra.valor) {
      this.loading.dismiss();
      this.createToastCloseButton('Valor não é um número válido.')
      return false;
    }
    return true;
  }

  private converterMumeros(): void {
    let quantidadeTemp = this.itemCompra.quantidade.toString().replace(',', '.');
    this.itemCompra.quantidade = parseFloat(quantidadeTemp);

    let valorTemp = this.itemCompra.valor.toString().replace(',', '.');
    this.itemCompra.valor = parseFloat(valorTemp);


  }

}
