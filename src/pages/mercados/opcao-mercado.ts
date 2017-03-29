import { Mercado } from './../../modelo/mercado';
import { ItemCompra } from './../../modelo/item-compra';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

export const ACOES_OPCAO_MERCADO = ['Editar', 'Apagar', 'Fechar'];

@Component({
    selector: 'opcao-mercado',
    templateUrl: 'opcao-mercado.html'
})
export class OpcaoMercadoPage {
    item: Mercado;
    acoes = ACOES_OPCAO_MERCADO;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams) {
        this.item = this.navParams.get('item');
    }

    onAction(action: string) {
        this.viewCtrl.dismiss({
            action: action,
            item: this.item
        });
    }

}