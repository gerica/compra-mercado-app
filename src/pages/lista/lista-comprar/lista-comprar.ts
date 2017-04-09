import { ItemCompra } from './../../../modelo/item-compra';
import { ListaComprarService } from './../../../services/lista-comprar.service';
import { BasePage } from './../../base';
import { ListaComprar } from './../../../modelo/lista-compar';
import { Component } from '@angular/core';
import {
  NavController,
  AlertController,
  LoadingController,
  ToastController,
  NavParams
} from 'ionic-angular';

@Component({
  selector: 'page-lista-comprar',
  templateUrl: 'lista-comprar.html'
})
export class ListaComprarPage extends BasePage {
  listaComprar: ListaComprar;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    protected loadingCtrl: LoadingController,
    protected toastCtrl: ToastController,
    private listaComprarService: ListaComprarService) {
    super(loadingCtrl, toastCtrl);
    let temp = navParams.get('listaComprar');
    if (temp === null || temp === undefined) {
      this.listaComprar = new ListaComprar();
    } else {
      this.listaComprar = temp;
    }

  }


  public onSubmit(event: any) {
    event.preventDefault();
    if (this.listaComprar.id === undefined || this.listaComprar.id === null) {
      this.listaComprarService.insertLista(this.listaComprar);
    } else {
      this.listaComprarService.updateLista(this.listaComprar);
    }
    this.navCtrl.pop();

  }

  public onAddItemAlert() {
    let alertAdd = this.alertCtrl.create({
      title: 'Adicionar Item',
      inputs: [
        {
          name: 'nome',
          placeholder: 'Nome'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Adicionar',
          handler: data => {
            if (data.nome.trim() == '' || data.nome == null) {
              this.createToast('Informe o nome do item');
              return;
            }
            let item = new ItemCompra();
            item.quantidade = 0;
            item.valor = "0";
            item.nome = data.nome;
            console.log(this.listaComprar.itens);
            this.listaComprar.itens.push(item);
          }
        }
      ]
    });
    alertAdd.present();
  }

  public onRemoveAlert(item: ItemCompra): void {
    let alert = this.alertCtrl.create({
      title: 'Apagar o item',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: data => {
            this.listaComprar.itens.splice(
              this.listaComprar.itens.indexOf(item),1
            );
          }
        }
      ]
    });
    alert.present();
  }

}
