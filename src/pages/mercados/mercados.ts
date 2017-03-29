import { ModalOpcaoMercaoPage } from './modal-opcao-mercado';
import { OpcaoMercadoPage, ACOES_OPCAO_MERCADO } from './opcao-mercado';
import { BasePage } from './../base';
import { MercadoSerice } from './../../services/mercado.service';
import { MercadoPage } from './../mercado/mercado';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import {
  NavController,
  ToastController,
  LoadingController,
  PopoverController,
  ModalController
} from 'ionic-angular';
import { ComprarPage } from "../comprar/comprar";

@Component({
  selector: 'page-mercados',
  templateUrl: 'mercados.html'
})
export class MercadosPage extends BasePage {

  mercados: Mercado[];

  constructor(public navCtrl: NavController,
    private mercadoService: MercadoSerice,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
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
    this.navCtrl.push(ComprarPage, { mercado: m });
  }

  public onOpcoes(mercado: Mercado): void {
    const popover = this.popoverCtrl.create(OpcaoMercadoPage, { item: mercado });
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.action === ACOES_OPCAO_MERCADO[0]) {
        this.modalOpcoes(data.item, ACOES_OPCAO_MERCADO[0])
      } else if (data.action === ACOES_OPCAO_MERCADO[1]) {
        this.modalOpcoes(data.item, ACOES_OPCAO_MERCADO[1])
      }

    });
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

  private modalOpcoes(item: Mercado, acao: string): void {
    let modal = this.modalCtrl.create(ModalOpcaoMercaoPage, { item: item, acao: acao });
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.acao === ACOES_OPCAO_MERCADO[0]) {
        this.editarMercado(data.item);
      } else if (data.acao === ACOES_OPCAO_MERCADO[1]) {
        this.remover(data.item);
      }
    });
  }

  private editarMercado(item: Mercado): void {
    console.log(item);
    this.mercadoService.editar(item).subscribe(
      (result: string) => {
        this.getMercados();
        this.createToast(result);
      }
    );
  }

  private remover(item: Mercado): void {
    this.mercadoService.remover(item).subscribe(
      (result: string) => {
        this.getMercados();
        this.createToast(result);
      }
    );
  }

}
