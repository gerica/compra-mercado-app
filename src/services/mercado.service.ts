import { Observable } from 'rxjs/Observable';
import { Mercado } from './../modelo/mercado';
import { MERCADOS } from './../dados/mercados';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from "@angular/core";

@Injectable()
export class MercadoSerice {
    private _mercados = MERCADOS;
    mercadoSub = new ReplaySubject();

    public getMercados(): Mercado[] {
        return this._mercados.slice();
    }

    public addMercado(mercado: Mercado): void {
        this._mercados.push(mercado);
        this.mercadoSub.next('Operação Realizada com sucesso.');
        this.mercadoSub.complete();
    }

    public comprandoMercado(mercado: Mercado): void {
        for (let m of this._mercados) {
            if (m.nome === mercado.nome) {
                m.compraAberta = true;
            }
        }
    }


    public fecharCompra(mercado: Mercado): Observable<Object> {
        let obj = new Observable(observer => {
            for (let m of this._mercados) {
                if (m.nome === mercado.nome) {
                    m.compraAberta = false;
                }
            }
            observer.next('Operação realizada com sucesso.')
            observer.complete();
        });
        return obj;
    }

}