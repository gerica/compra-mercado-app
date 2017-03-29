import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';
import { ItemCompra } from './../modelo/item-compra';
import { Mercado } from './../modelo/mercado';
import { Compra } from './../modelo/compra';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";


@Injectable()
export class CompraService {
    // TODO
    private _compras: Compra[] = [];
    constructor(private storage: Storage,
        private utilService: UtilService) {
        this.getCompras();
    }

    // Retorna um compra aberta ou cria uma nova
    public criarOuObterCompra(mercado: Mercado): Compra {
        let compra: Compra;
        if (this._compras.length > 0) {
            compra = this._compras.find((c: Compra) => {
                if (mercado.id === c.mercado.id) {
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
            compra.id = this.utilService.uniqueId();
            this._compras.push(compra);
            const index = this._compras.indexOf(compra);
            this.addCompra(index);
        }
        return compra;
    }

    public addItem(item: ItemCompra, compra: Compra): Observable<Object> {
        let obj = new Observable(observer => {
            compra.itens.push(item);
            this.addCompra();
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    public editarItemCompra(item: ItemCompra): Observable<Object> {
        let obj = new Observable(observer => {
            this.addCompra();
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
            this.addCompra();
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
            this.getCompras().then(() => {
                console.log(this._compras);
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

    private getCompras(): Promise<Compra[]> {
        return this.storage.get('compras')
            .then(
            compras => {
                this._compras = compras !== null ? compras : [];
                return this._compras.slice();

            }).catch(err => console.error(err));
    }

    private addCompra(...index): void {
        this.storage.set('compras', this._compras)
            .then((data: Compra[]) => {
                console.log(`sucesso ${data}`);
            })
            .catch(err => {
                if (index) {
                    for (let i of index) {
                        this._compras.splice(i, 1);
                    }
                }
            });
    }
}