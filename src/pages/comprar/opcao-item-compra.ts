import { ItemCompra } from './../../modelo/item-compra';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

export const ACOES = ['Visualizar', 'Editar', 'Apagar', 'Fechar'];

@Component({
    selector: 'opcao-item-compra',
    templateUrl: 'opcao-item-compra.html'
})
export class OpcaoItemCompraPage {
    itemCompra: ItemCompra;
    acoes = ACOES;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams) {
        this.itemCompra = this.navParams.get('item');
    }

    onAction(action: string) {
        this.viewCtrl.dismiss({
            action: action,
            item: this.itemCompra
        });
    }

}