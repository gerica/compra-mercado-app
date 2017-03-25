import { COMPRAS } from './../dados/compras';
import { Mercado } from './../modelo/mercado';
import { Compra } from './../modelo/compra';
import { Injectable } from '@angular/core';

@Injectable()
export class CompraService {
    private _compra: Compra;
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
        console.log(this._compras);
        return compra;
    }

}