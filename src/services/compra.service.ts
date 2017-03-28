import { Observable } from 'rxjs/Observable';
import { ItemCompra } from './../modelo/item-compra';
import { COMPRAS } from './../dados/compras';
import { Mercado } from './../modelo/mercado';
import { Compra } from './../modelo/compra';
import { Injectable } from '@angular/core';

@Injectable()
export class CompraService {
    // TODO
    private _compras = COMPRAS;

    // Retorna um compra aberta ou cria uma nova
    public criarOuObterCompra(mercado: Mercado): Compra {
        let compra: Compra;;
        if (this._compras.length > 0) {
            compra = this._compras.find((c: Compra) => {
                if (mercado.nome === c.mercado.nome) {
                    if (c.data === undefined) {
                        return true;
                    }
                }
                return false;
            });
        }

        if (compra === undefined || compra === null) {
            compra = new Compra();
            compra.mercado = mercado;
            this._compras.push(compra);
        }
        return compra;
    }

    public addItem(item: ItemCompra, compra: Compra): Observable<Object> {
        let obj = new Observable(observer => {
            compra.itens.push(item)
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    public editarItemCompra(item: ItemCompra): Observable<Object> {
        let obj = new Observable(observer => {
            // let index = this._itens.indexOf(item);
            // console.log(this._itens[index]);
            // console.log(item);
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    public remover(compra: Compra, item: ItemCompra): Observable<Object> {
        let obj = new Observable(observer => {
            let index = compra.itens.indexOf(item);
            compra.itens.splice(index, 1);
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    public realizarCompra(compra: Compra, valor: number): Observable<Object> {
        let obj = new Observable(observer => {
            compra.valor = valor;
            compra.data = new Date();
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    public getItensOrdenado(compra: Compra): ItemCompra[] {
        if (compra.itens.length > 0) {

            return compra.itens.sort((a: ItemCompra, b: ItemCompra) => {
                if (a.nome > b.nome) {
                    return 1
                } else if (a.nome < b.nome) {
                    return -1
                }
                return 0;
            });
        }
        return [];

    }



    public getComprasRealizadas(): Observable<Object> {
        let obj = new Observable(observer => {
            let compras: Compra[] = [];
            if (this._compras.length > 0) {
                for (let c of this._compras) {
                    if (c.data !== undefined) {
                        compras.push(c);
                    }
                }
            }
            observer.next(compras)
            observer.complete();
        });
        return obj;
    }

}