import { Observable } from 'rxjs/Observable';
import { Mercado } from './../modelo/mercado';
import { Injectable } from "@angular/core";

import { Storage } from "@ionic/storage";

@Injectable()
export class MercadoSerice {
    private _mercados: Mercado[] = [];

    constructor(private storage: Storage) { }

    public getMercados(): Promise<Mercado[]> {
        return this.storage.get('mercados')
            .then(
            mercados => {
                this._mercados = mercados !== null ? mercados : [];
                return this._mercados.slice();

            }).catch(err => console.error(err));
    }

    public addMercado(mercado: Mercado): void {
        this._mercados.push(mercado);
        const index = this._mercados.indexOf(mercado);
        this.addMercados(index);
    }

    public comprandoMercado(mercado: Mercado): void {
        for (let m of this._mercados) {
            if (m.nome === mercado.nome) {
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
                if (m.nome === mercado.nome) {
                    m.compraAberta = false;
                }
            }
            this.addMercados();
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

    private addMercados(...index): void {
        this.storage.set('mercados', this._mercados)
            .then((data: Mercado[]) => {
                console.log(`sucesso ${data}`);
            })
            .catch(err => {
                if (index) {
                    for (let i of index) {
                        this._mercados.splice(i, 1);
                    }
                }
            });
    }

}