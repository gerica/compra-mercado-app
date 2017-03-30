import { ComprarPage } from './../comprar/comprar';
import { BasePage } from './../base';
import { ModalListaItemPage } from './modal/modal-lista-item';
import { OpcaoListCompraPage, ACOES_LISTA_COMPRA } from './opcao-lista-compra';
import { Compra } from './../../modelo/compra';
import { CompraService } from './../../services/compra.service';
import { Component } from '@angular/core';
import {
  PopoverController,
  ModalController,
  AlertController,
  LoadingController,
  ToastController,
  NavController
} from "ionic-angular";
import { OpcaoListaPage, ACOES_LISTA } from "./opcao-lista";


@Component({
  selector: 'page-lista-compra',
  templateUrl: 'lista-compra.html'
})
export class ListaCompraPage extends BasePage {
  compras: Compra[];

  constructor(public navCtrl: NavController,
    private compraService: CompraService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private popoverCtrl: PopoverController) {
    super(loadingCtrl, toastCtrl);
  }

  ionViewWillEnter() {
    console.clear();
    this.getCompras();
  }

  public onOpcoes(compra: Compra): void {
    const popover = this.popoverCtrl.create(OpcaoListCompraPage, { compra: compra });
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.action === ACOES_LISTA_COMPRA[0]) {
        this.modalListaItens(data.compra)
      } else if (data.action === ACOES_LISTA_COMPRA[1]) {
        this.onComprarPreLista(data.compra);
      } else if (data.action === ACOES_LISTA_COMPRA[2]) {
        this.showConfirmApagar(data.compra);
      } else if (data.action === ACOES_LISTA_COMPRA[3]) {
        console.log(data.action);
        return;
      }

    });
  }

  public onShowOptions(event: MouseEvent) {
    const popover = this.popoverCtrl.create(OpcaoListaPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.action === ACOES_LISTA[0]) {
        this.showConfirmApagarAll();
      }
    });

  }

  public showConfirmApagarAll(): void {
    let confirm = this.alertCtrl.create({
      title: 'Apagar Compra',
      message: `Todas as compras serão apagadas.`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            confirm.dismiss();
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.remove(null);
          }
        }
      ]
    });
    confirm.present();
  }

  public showConfirmApagar(compra: Compra): void {
    // dia ${this.dataAtualFormatada(compra.data)}
    let confirm = this.alertCtrl.create({
      title: 'Apagar Compra',
      message: `A compra do mercado ${compra.mercado.nome} no valor de ${compra.valor} será apagada.`,
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            confirm.dismiss();
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.remove(compra);
          }
        }
      ]
    });
    confirm.present();
  }

  private modalListaItens(compra: Compra): void {
    let modal = this.modalCtrl.create(ModalListaItemPage, { compra: compra });
    modal.present();
  }

  private getCompras(): void {
    this.compraService.getComprasRealizadas().subscribe(
      (data: Compra[]) => {
        this.compras = data;
      }
    );
  }

  private remove(compra: Compra): void {
    this.createLoading('Apagando...');
    this.compraService.removeCompra(compra).subscribe(
      (msg: string) => {
        this.getCompras();
        this.loading.dismiss();
        this.createToast(msg);
      },
      err => {
        this.loading.dismiss();
        this.createToast(err);
      })
  }

  private dataAtualFormatada(data: Date): string {

    let month = String(data.getMonth() + 1);
    let day = String(data.getDate());
    const year = String(data.getFullYear());

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return `${month}/${day}/${year}`;

  }

  private onComprarPreLista(compra: Compra): void {
    this.navCtrl.push(ComprarPage, { mercado: compra.mercado, itens: compra.itens });

  }

}
