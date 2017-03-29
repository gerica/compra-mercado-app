import { MercadoSerice } from './../../services/mercado.service';
import { BasePage } from './../base';
import { ModalOpcaoItemCompraPage } from './modal-opcao-item-compra';
import { OpcaoItemCompraPage, ACOES } from './opcao-item-compra';
import { CompraService } from './../../services/compra.service';
import { ItemCompraPage } from './../item-compra/item-compra';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  PopoverController,
  ModalController,
  LoadingController,
  ToastController,
  AlertController
} from 'ionic-angular';

@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html'
})
export class ComprarPage extends BasePage {

  mercado: Mercado;
  compra: Compra;
  itens: ItemCompra[] = [];
  totalValor: number;
  totalItens: number;
  temItens = false;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private compraService: CompraService,
    private mercadoService: MercadoSerice,
    private alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController) {
    super(loadingCtrl, toastCtrl)
    this.mercado = this.navParams.get('mercado');
  }


  ionViewWillEnter() {
    // console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    this.getItens();
  }

  public onNovoItem(): void {
    this.navCtrl.push(ItemCompraPage, { compra: this.compra })
  }

  private getItens() {
    this.itens = this.compraService.getItensOrdenado(this.compra);
    const totalObj: any = this.compraService.calcularTotais(this.itens);
    this.totalItens = totalObj.totalItens;
    this.totalValor = totalObj.totalValor;
    this.habilitarBotaoCompra();
  }

  public onOpcoes(item: ItemCompra, event: MouseEvent): void {
    const popover = this.popoverCtrl.create(OpcaoItemCompraPage, { item: item });
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.action === ACOES[0]) {
        this.modalOpcoes(data.item, ACOES[0])
      } else if (data.action === ACOES[1]) {
        this.modalOpcoes(data.item, ACOES[1])
      } else if (data.action === ACOES[2]) {
        this.modalOpcoes(data.item, ACOES[2])
      } else if (data.action === ACOES[3]) {
        return;
      }

    });
  }

  private modalOpcoes(item: ItemCompra, acao: string): void {
    let modal = this.modalCtrl.create(ModalOpcaoItemCompraPage, { item: item, acao: acao });
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.acao === ACOES[0]) {
        return;
      } else if (data.acao === ACOES[1]) {
        this.editarItemCompra(data.item);
      } else if (data.acao === ACOES[2]) {
        this.remover(data.item);
      }
    });
  }

  private editarItemCompra(item: ItemCompra): void {
    this.compraService.editarItemCompra(item).subscribe(
      (result: string) => {
        this.getItens();
        this.createToast(result);
      }
    );
  }

  private remover(item: ItemCompra): void {
    this.compraService.remover(this.compra, item).subscribe(
      (result: string) => {
        this.getItens();
        this.createToast(result);
      }
    );
  }

  private onComprar(): void {
    this.compraService.realizarCompra(this.compra, this.totalValor).subscribe(
      (result: string) => {
        this.mercadoService.fecharCompra(this.compra.mercado).subscribe(
          (result: string) => {
            this.createToast(result);
            this.navCtrl.popToRoot();
          }
        )
      }
    );
  }


  public showConfirm(): void {
    let confirm = this.alertCtrl.create({
      title: 'Realizar Compra',
      message: `Finalizar a compra, mercado: ${this.compra.mercado.nome}, valor: R$ ${this.totalValor}`,
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
            this.onComprar();
          }
        }
      ]
    });
    confirm.present();
  }

  private habilitarBotaoCompra(): void {
    if (this.compra.itens.length > 0) {
      this.temItens = true;
    } else {
      this.temItens = false;
      this.mercadoService.fecharCompra(this.compra.mercado).subscribe();
    }
  }


  // ionViewDidLoad() {
  // }
  // ionViewCanEnter(): void {
  //   console.log('ionViewCanEnter');
  // }

  // ionViewDidLog() {
  //   console.log('ionViewDidLog');
  // }

  // ionViewDidEnter() {
  //   console.log('ionViewDidEnter');
  // }

  // ionViewCanLeave(): void {
  //   console.log('ionViewCanLeave');
  // }


}
