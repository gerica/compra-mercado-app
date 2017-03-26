import { MercadoSerice } from './../../services/mercado.service';
import { MercadoPage } from './../mercado/mercado';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ComprarPage } from "../comprar/comprar";

@Component({
  selector: 'page-mercados',
  templateUrl: 'mercados.html',
  providers: [MercadoSerice]
})
export class MercadosPage {

  mercados: Mercado[];

  constructor(public navCtrl: NavController,
    private mercadoService: MercadoSerice) {
    console.clear();
  }

  ionViewWillEnter() {
    this.getMercados();
    console.log(this.mercados);
  }

  public onNovoMercado() {
    this.navCtrl.push(MercadoPage)

  }

  public onComprar(m: Mercado): void {
    console.log(m);
    this.navCtrl.push(ComprarPage, { mercado: m });
  }

  private getMercados(): void {
    this.mercados = this.mercadoService.getMercados();
  }

}
