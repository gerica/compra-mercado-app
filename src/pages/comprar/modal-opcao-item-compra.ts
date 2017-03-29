import { BasePage } from './../base';
import { ItemCompra } from './../../modelo/item-compra';
import { ACOES } from './opcao-item-compra';

import { NavParams, ViewController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
@Component({
    templateUrl: 'modal-opcao-item-compra.html'
})
export class ModalOpcaoItemCompraPage extends BasePage implements OnInit {
    acao: string;
    titulo: string;
    acoes: string[] = ACOES;
    item: ItemCompra;

    constructor(public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController,
        protected loadingCtrl: LoadingController,
        protected toastCtrl: ToastController) {
        super(loadingCtrl, toastCtrl);
    }

    ngOnInit() {
        this.item = this.params.get('item');
        this.acao = this.params.get('acao');
        this.titulo = this.acao;
        // this.converterMumerosShowTela();
    }

    public onSubmit(event: any): void {
        event.preventDefault();
        this.dismiss(this.acao);

    }

    public dismiss(acao: string) {
        if (this.validarForm) {
            this.converterMumeros();
            this.viewCtrl.dismiss({
                acao: acao,
                item: this.item
            });
        }
    }

    private validarForm(): boolean {
        if (!this.item.quantidade) {
            this.createToastCloseButton('A quantidade é obrigatório.')
            return false;
        }


        if (!this.item.valor) {
            this.createToastCloseButton('Valor não é um número válido.')
            return false;
        }
        return true;
    }

    private converterMumeros(): void {
        let quantidadeTemp = this.item.quantidade.toString().replace(',', '.');
        this.item.quantidade = parseFloat(quantidadeTemp);

        let valorTemp = this.item.valor.toString().replace(',', '.');
        this.item.valor = parseFloat(valorTemp);
    }

    private converterMumerosShowTela(): void {
        let quantidadeTemp = this.item.quantidade.toString().replace('.', ',');
        this.item.quantidade = parseFloat(quantidadeTemp);

        let valorTemp = this.item.valor.toString().replace('.', ',');
        this.item.valor = parseFloat(valorTemp);
    }

}