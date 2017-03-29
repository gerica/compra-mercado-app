import { BasePage } from './../base';
import { MercadoSerice } from './../../services/mercado.service';
import { MercadoPage } from './../mercado/mercado';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { ComprarPage } from "../comprar/comprar";

@Component({
  selector: 'page-mercados',
  templateUrl: 'mercados.html'
})
export class MercadosPage extends BasePage {

  mercados: Mercado[];

  constructor(public navCtrl: NavController,
    private mercadoService: MercadoSerice,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController) {
    super(loadingCtrl, toastCtrl);
    console.clear();
  }

  ionViewWillEnter() {
    this.getMercados();    
  }

  public onNovoMercado() {
    this.navCtrl.push(MercadoPage)

  }

  public onComprar(m: Mercado): void {
    console.log(m);
    this.navCtrl.push(ComprarPage, { mercado: m });
  }

  private getMercados(): void {
    this.mercadoService.getMercados()
      .then((data: Mercado[]) => {
        this.mercados = data;
        console.log(this.mercados);
      })
      .catch(err => {
        this.createToast(err.message);
      });
  }

}
