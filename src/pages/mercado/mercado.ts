import { MercadoSerice } from './../../services/mercado.service';
import { BasePage } from './../base';
import { Mercado } from './../../modelo/mercado';
import { Component, OnInit } from '@angular/core';
import {
  NavController,
  LoadingController,
  ToastController
} from 'ionic-angular';

@Component({
  selector: 'page-mercado',
  templateUrl: 'mercado.html',
  providers: [MercadoSerice]
})
export class MercadoPage extends BasePage implements OnInit {
  mercado: Mercado;

  constructor(public navCtrl: NavController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private mercadoService: MercadoSerice) {
    super(loadingCtrl, toastCtrl)
  }

  ngOnInit() {
    this.mercado = new Mercado();
    console.clear();
  }

  public onSubmit(event: any) {
    event.preventDefault();
    this.createLoading('Gravando...');
    this.mercadoService.addMercado(this.mercado);
    this.mercadoService.mercadoSub.subscribe(
      (result: string) => {
        this.loading.dismiss();
        this.createToast(result);
        this.navCtrl.pop();
      }
    )
  }

}
