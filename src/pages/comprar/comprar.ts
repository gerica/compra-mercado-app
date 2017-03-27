import { BasePage } from './../base';
import { ModalOpcaoItemCompraPage } from './modal-opcao-item-compra';
import { OpcaoItemCompraPage, ACOES } from './opcao-item-compra';
import { ItemCompraService } from './../../services/item-compra.service';
import { CompraService } from './../../services/compra.service';
import { ItemCompraPage } from './../item-compra/item-compra';
import { ItemCompra } from './../../modelo/item-compra';
import { Compra } from './../../modelo/compra';
import { Mercado } from './../../modelo/mercado';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, ModalController, LoadingController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-comprar',
  templateUrl: 'comprar.html',
  providers: [CompraService, ItemCompraService]
})
export class ComprarPage extends BasePage {
  mercado: Mercado;
  compra: Compra;
  itens: ItemCompra[] = [];
  totalItens: number;
  totalValor: number;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private compraService: CompraService,
    private itemService: ItemCompraService,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController) {
    super(loadingCtrl, toastCtrl)
    this.mercado = this.navParams.get('mercado');
  }


  ionViewWillEnter() {
    console.clear();
    this.compra = this.compraService.criarOuObterCompra(this.mercado);
    this.getItens();    
  }

  public onNovoItem(): void {
    this.navCtrl.push(ItemCompraPage, { compra: this.compra })
  }

  private getItens() {
    this.itens = this.itemService.getItens(this.compra);
    this.calcularTotais();
  }

  private calcularTotais(): void {
    this.totalItens = 0;
    this.totalValor = 0;
    for (let i of this.itens) {
      this.totalItens = this.totalItens + parseInt(i.quantidade + '');
      this.totalValor += i.valor * parseInt(i.quantidade + '');
    }
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
    this.itemService.editarItemCompra(item).subscribe(
      (result: string) => {
        this.getItens();
        this.createToast(result);
      }
    );    
  }


  private remover(item: ItemCompra): void {
    this.itemService.remover(item).subscribe(
      (result: string) => {
        this.getItens();
        this.createToast(result);
      }
    );    
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
