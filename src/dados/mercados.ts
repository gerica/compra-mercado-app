import { Mercado } from './../modelo/mercado';
export const MERCADOS: Mercado[] = [];

const mercado_1 = new Mercado();
mercado_1.nome = 'Super Barão';

const mercado_2 = new Mercado();
mercado_2.nome = 'Carrefour';

const mercado_3 = new Mercado();
mercado_3.nome = 'Atacadão';

MERCADOS.push(mercado_1);
MERCADOS.push(mercado_2);
MERCADOS.push(mercado_3);
