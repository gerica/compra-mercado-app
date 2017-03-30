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
  itensPrePreenchidos: ItemCompra[] = [];
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
    this.itensPrePreenchidos = this.navParams.get('itens');
  }


  ionViewWillEnter() {
    // console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    this.criarListaItens();
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
        this.showConfirmApagar(data.item);
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
        this.showConfirmApagar(data.item);
      }
    });
  }

  private editarItemCompra(item: ItemCompra): void {
    console.log(item);
    this.compraService.updateItemCompra(item).subscribe(
      (result: string) => {
        this.getItens();
        this.createToast(result);
      }
    );
  }

  private remover(item: ItemCompra): void {
    this.compraService.removeItemCompra(this.compra, item).subscribe(
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

  public showConfirmApagar(item: ItemCompra): void {
    let confirm = this.alertCtrl.create({
      title: 'Apagar Compra',
      message: `O item ${item.nome} no valor de ${item.valor} será removido.`,
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
            this.remover(item);
          }
        }
      ]
    });
    confirm.present();
  }

  private habilitarBotaoCompra(): void {
    if (this.compra.itens.length > 0) {
      for (let i of this.compra.itens) {
        if (i.valor === "0" || i.quantidade === 0) {
          this.temItens = false;
          return;
        }
      }
      this.temItens = true;
    } else {
      this.temItens = false;
      this.mercadoService.fecharCompra(this.compra.mercado).subscribe();
    }
  }

  private criarListaItens(): void {
    if (!!this.itensPrePreenchidos) {
      for (let i of this.itensPrePreenchidos) {
        i.quantidade = 0;
        // i.valor = "0";
        this.compraService.insertItemCompra(i, this.compra).subscribe(
          (result: string) => {
            this.mercadoService.comprandoMercado(this.compra.mercado);
          }
        );
      }
      this.habilitarBotaoCompra();
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
