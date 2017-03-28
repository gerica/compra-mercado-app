import { ModalListaItemPage } from './modal/modal-lista-item';
import { OpcaoListCompraPage, ACOES_LISTA_COMPRA } from './opcao-lista-compra';
import { Compra } from './../../modelo/compra';
import { CompraService } from './../../services/compra.service';
import { Component } from '@angular/core';
import { PopoverController, ModalController } from "ionic-angular";


@Component({
  selector: 'page-lista-compra',
  templateUrl: 'lista-compra.html',
  providers: [CompraService]
})
export class ListaCompraPage {
  compras: Compra[];

  constructor(private compraService: CompraService,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController) { }

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
        console.log(data.action);
      } else if (data.action === ACOES_LISTA_COMPRA[2]) {
        console.log(data.action);
      } else if (data.action === ACOES_LISTA_COMPRA[3]) {
        console.log(data.action);
        return;
      }

    });
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

}
