import { Compra } from './../../modelo/compra';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

export const ACOES_LISTA_COMPRA = ['Visualizar', 'Usar Lista', 'Fechar'];

@Component({
    selector: 'opcao-lista-compra',
    templateUrl: 'opcao-lista-compra.html'
})
export class OpcaoListCompraPage {
    compra: Compra;
    acoes = ACOES_LISTA_COMPRA;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams) {
        this.compra = this.navParams.get('compra');
    }

    onAction(action: string) {
        this.viewCtrl.dismiss({
            action: action,
            compra: this.compra
        });
    }

}