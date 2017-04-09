import { ListaComprar } from './../../modelo/lista-compar';
import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

export const ACOES_LISTA_COMPRAR = ['Visualizar', 'Usar Lista', 'Apagar', 'Fechar'];

@Component({
    selector: 'opcao-lista-comprar',
    templateUrl: 'opcao-lista-comprar.html'
})
export class OpcaoListaComprarPage {
    listaComprar: ListaComprar;
    acoes = ACOES_LISTA_COMPRAR;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams) {
        this.listaComprar = this.navParams.get('listaComprar');
    }

    onAction(action: string) {
        this.viewCtrl.dismiss({
            action: action,
            compra: this.listaComprar
        });
    }

}