import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';
import { Mercado } from './../modelo/mercado';
import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

@Injectable()
export class MercadoSerice {
    private _mercados: Mercado[] = [];

    constructor(private storage: Storage,
        private utilService: UtilService) { }

    public getMercados(): Promise<Mercado[]> {
        return this.storage.get('mercados')
            .then(
            mercados => {
                this._mercados = mercados !== null ? mercados : [];
                return this._mercados.slice();

            }).catch(err => console.error(err));
    }

    public addMercado(mercado: Mercado): void {
        mercado.id = this.utilService.uniqueId();
        this._mercados.push(mercado);
        const index = this._mercados.indexOf(mercado);
        this.addMercados(index);
    }

    public comprandoMercado(mercado: Mercado): void {
        for (let m of this._mercados) {
            if (m.id === mercado.id) {
                m.compraAberta = true;
                console.log(m.compraAberta);
                break;
            }
        }
        this.addMercados();
    }

    public fecharCompra(mercado: Mercado): Observable<Object> {
        let obj = new Observable(observer => {
            for (let m of this._mercados) {
                if (m.id === mercado.id) {
                    m.compraAberta = false;
                }
            }
            this.storageMercado().then(
                () => {
                    observer.next('Operação realizada com sucesso.')
                    observer.complete();
                }
            );
        });
        return obj;
    }

    public editar(mercado: Mercado): Observable<Object> {
        let obj = new Observable(observer => {
            this.storageMercado().then(
                () => {
                    observer.next('Operação realizada com sucesso.')
                    observer.complete();
                });
        });
        return obj;
    }

    public remover(mercado: Mercado): Observable<Object> {
        let obj = new Observable(observer => {
            const index = this._mercados.indexOf(mercado);
            this._mercados.splice(index, 1);
            this.storageMercado().then(
                () => {
                    observer.next('Operação realizada com sucesso.')
                    observer.complete();
                }
            );
        });
        return obj;
    }

    private addMercados(...index): void {
        this.storageMercado()
            .then()
            .catch(err => {
                if (index) {
                    for (let i of index) {
                        this._mercados.splice(i, 1);
                    }
                }
            });
    }

    private storageMercado(): Promise<Mercado[]> {
        return this.storage.set('mercados', this._mercados);
    }

}