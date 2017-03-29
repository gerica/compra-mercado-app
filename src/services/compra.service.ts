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
        this.fetchCompras();
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
            this.persistCompras(index);
        }
        return compra;
    }

    public insertItemCompra(item: ItemCompra, compra: Compra): Observable<Object> {
        let obj = new Observable(observer => {
            compra.itens.push(item);
            this.storageCompra().then(() => {
                observer.next('Operação realizada com sucesso.')
                observer.complete();
            });
        });
        return obj;
    }

    public updateItemCompra(item: ItemCompra): Observable<Object> {
        let obj = new Observable(observer => {
            this.persistCompras();
            this.storageCompra().then(() => {
                observer.next('Operação realizada com sucesso.')
                observer.complete();
            });
        });
        return obj;
    }

    public removeItemCompra(compra: Compra, item: ItemCompra): Observable<Object> {
        let obj = new Observable(observer => {
            let index = compra.itens.indexOf(item);
            compra.itens.splice(index, 1);
            this.storageCompra().then(() => {
                observer.next('Operação realizada com sucesso.')
                observer.complete();
            });
        });
        return obj;
    }

    public realizarCompra(compra: Compra, valor: number): Observable<Object> {
        let obj = new Observable(observer => {
            compra.valor = valor;
            compra.data = new Date();
            this.storageCompra().then(() => {
                observer.next('Operação realizada com sucesso.')
                observer.complete();
            });
        });
        return obj;
    }

    public getItensOrdenado(compra: Compra): ItemCompra[] {
        if (compra.itens.length > 0) {

            return compra.itens.sort((a: ItemCompra, b: ItemCompra) => {
                if (a.nome > b.nome) {
                    return 1;
                } else if (a.nome < b.nome) {
                    return -1;
                }
                return 0;
            });
        }
        return [];

    }

    public getComprasRealizadas(): Observable<Object> {
        let obj = new Observable(observer => {
            this.fetchCompras().then(() => {
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

    public removeCompra(compra: Compra): Observable<Object> {
        let obj = new Observable(observer => {
            this.fetchCompras().then(() => {
                if (this._compras.length > 0) {
                    if (compra !== null) {
                        let index = this._compras.indexOf(compra);
                        this._compras.splice(index, 1);
                    } else {
                        this._compras = [];
                    }
                    this.storageCompra().then(() => {
                        observer.next('Operação realizada com sucesso.')
                        observer.complete();
                    });
                } else {
                    observer.next('Operação realizada com sucesso.')
                    observer.complete();
                }
            });
        });
        return obj;
    }

    private fetchCompras(): Promise<Compra[]> {
        return this.storage.get('compras')
            .then(
            compras => {
                this._compras = compras !== null ? compras : [];
                return this._compras.slice();

            }).catch(err => console.error(err));
    }

    private persistCompras(...index): void {
        this.storageCompra().then((data: Compra[]) => {
            console.log(`sucesso ${data}`);
        }).catch(err => {
            if (index) {
                for (let i of index) {
                    this._compras.splice(i, 1);
                }
            }
        });
    }

    private storageCompra(...index): Promise<Compra[]> {
        return this.storage.set('compras', this._compras);
    }

}