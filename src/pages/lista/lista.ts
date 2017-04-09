import { ComprarPage } from './../comprar/comprar';
import { Mercado } from './../../modelo/mercado';
import { MercadoSerice } from './../../services/mercado.service';
import { BasePage } from './../base';
import { ModalListaComprarItemPage, ACOES } from './modal/modal-lista-comprar-item';
import { OpcaoListaComprarPage, ACOES_LISTA_COMPRAR } from './opcao-lista-comprar';
import { ListaComprarService } from './../../services/lista-comprar.service';
import { ListaComprar } from './../../modelo/lista-compar';
import { ListaComprarPage } from './lista-comprar/lista-comprar';
import { Component } from '@angular/core';
import {
  NavController,
  PopoverController,
  ModalController,
  AlertController,
  LoadingController,
  ToastController
} from 'ionic-angular';

@Component({
  selector: 'page-lista',
  templateUrl: 'lista.html'
})
export class ListaPage extends BasePage {
  listaCompras: Set<ListaComprar> = new Set<ListaComprar>();

  constructor(public navCtrl: NavController,
    private popoverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private mercadoService: MercadoSerice,
    private listaComprarService: ListaComprarService) {
    super(loadingCtrl, toastCtrl);
  }

  onNovaLista(): void {
    this.navCtrl.push(ListaComprarPage);
  }

  ionViewWillEnter() {
    this.getListaComprar();
  }

  public onOpcoes(listaComprar: ListaComprar): void {
    const popover = this.popoverCtrl.create(OpcaoListaComprarPage, { listaComprar: listaComprar });
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.action === ACOES_LISTA_COMPRAR[0]) {
        this.modalListaItens(data.compra)
      } else if (data.action === ACOES_LISTA_COMPRAR[1]) {
        this.showConfirmUsarLista(data.compra);
      } else if (data.action === ACOES_LISTA_COMPRAR[2]) {
        this.showConfirmApagar(data.compra);
      } else if (data.action === ACOES_LISTA_COMPRAR[3]) {
        console.log(data.action);
        return;
      }

    });
  }

  private getListaComprar(): void {
    this.listaComprarService.getListaCadastrada().subscribe(
      (result: Set<ListaComprar>) => {
        this.listaCompras = result;
      }
    );
  }


  private modalListaItens(listaComprar: ListaComprar): void {
    let modal = this.modalCtrl.create(ModalListaComprarItemPage, { listaComprar: listaComprar });
    modal.present();
    modal.onDidDismiss(data => {
      if (!data) {
        return;
      } else if (data.acao === ACOES[0]) {
        this.navCtrl.push(ListaComprarPage, { listaComprar: listaComprar });
        return;
      }
    });
  }

  public showConfirmApagar(listaComprar: ListaComprar): void {
    let confirm = this.alertCtrl.create({
      title: 'Apagar lista de Compras',
      message: `A lista ${listaComprar.nome} será apagada.`,
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
            this.remove(listaComprar);
          }
        }
      ]
    });
    confirm.present();
  }

  private remove(listaComprar: ListaComprar): void {
    this.createLoading('Apagando...');
    this.listaComprarService.removeListaComprar(listaComprar).subscribe(
      (msg: string) => {
        this.getListaComprar();
        this.loading.dismiss();
        this.createToast(msg);
      },
      err => {
        this.loading.dismiss();
        this.createToast(err);
      })
  }

  private showConfirmUsarLista(listaComprar: ListaComprar): void {
    this.createLoading("Usar lista...");
    this.mercadoService.fetchMercados()
      .then((mercados: Mercado[]) => {
        const inputs = [];
        for (let m of mercados) {
          inputs.push({
            type: 'radio',
            label: m.nome,
            value: m
          });
        }

        let confirm = this.alertCtrl.create({
          title: 'Usar lista',
          message: `Usar lista para realizar compra. Selecione o mercado`,
          inputs: inputs,
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
                confirm.dismiss();
              }
            },
            {
              text: 'Confirmar',
              handler: (mercado: Mercado) => {
                this.onComprarPreLista(mercado, listaComprar);
              }
            }
          ]
        });
        this.loading.dismiss();
        confirm.present();
      });
  }

  private onComprarPreLista(mercado: Mercado, listaComprar: ListaComprar): void {
    let itens = Array.from(listaComprar.itens);
    this.navCtrl.push(ComprarPage, { mercado: mercado, itens: itens });
  }

}
