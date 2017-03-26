import { Compra } from './../modelo/compra';
import { ItemCompra } from './../modelo/item-compra';
import { ITEM_COMPRA } from './../dados/item-compra';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class ItemCompraService {
    private _itens = ITEM_COMPRA;
    itemSub = new ReplaySubject();

    public addItem(item: ItemCompra): void {
        this._itens.push(item);
        this.itemSub.next('Operação Realizada com sucesso.');
        this.itemSub.complete();
    }

    public getItens(compra: Compra): ItemCompra[] {
        let result: ItemCompra[] = [];

        for (let i of this._itens) {
            if (compra.mercado.nome === i.compra.mercado.nome) {
                result.push(i);
            }
        }
        return result;
    }

}