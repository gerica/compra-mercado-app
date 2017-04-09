import { ItemCompra } from './item-compra';

export class ListaComprar {
    id: string;
    nome: string;
    itens = new Set<ItemCompra>();
}