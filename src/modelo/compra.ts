import { ItemCompra } from './item-compra';
import { Mercado } from './mercado';

export class Compra {
    id: string;
    mercado: Mercado;
    data: Date;
    valor: number;
    itens: ItemCompra[] = [];
}