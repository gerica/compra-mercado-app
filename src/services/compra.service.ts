import { MERCADOS } from './../dados/mercados';
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
        this.addCompraFake();
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

    public calcularTotais(itens: ItemCompra[]): Object {
        let totalItens = 0;
        let totalValor = 0;
        for (let i of itens) {
            totalItens = totalItens + parseFloat(i.quantidade + '');
            totalValor += i.valor * parseFloat(i.quantidade + '');
        }
        return {
            totalItens: totalItens,
            totalValor: totalValor
        }
    }

    private addCompraFake(): void {
        const compra = new Compra();
        compra.mercado = MERCADOS[0];
        compra.data = new Date();
        compra.valor = 159.65;

        const item1 = new ItemCompra();
        item1.descricao = 'Rapadura doce';
        item1.nome = 'Rapadura';
        item1.quantidade = 12;
        item1.valor = 8.36;

        const item2 = new ItemCompra();
        item2.descricao = 'Margarina para todos';
        item2.nome = 'Margarina';
        item2.quantidade = 4;
        item2.valor = 4.99;

        compra.itens.push(item1);
        compra.itens.push(item2);
        this._compras.push(compra);

    }

}