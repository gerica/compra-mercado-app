import { ItemCompra } from './item-compra';
import { Mercado } from './mercado';
export class Compra {
    mercado: Mercado;
    data: Date;
    valor: number;
    itens: ItemCompra[] = [];
}