import { Mercado } from './../modelo/mercado';
import { MERCADOS } from './../dados/mercados';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from "@angular/core";

@Injectable()
export class MercadoSerice {
    private _mercados = MERCADOS;
    mercadoSub = new ReplaySubject();

    public getMercados(): Mercado[] {
        return this._mercados;
    }

    public addMercado(mercado: Mercado): void {
        this._mercados.push(mercado);
        this.mercadoSub.next('Operação Realizada com sucesso.');
        this.mercadoSub.complete();
    }

}