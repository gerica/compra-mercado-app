import { ListaPage } from './../lista/lista';
import { MercadosPage } from './../mercados/mercados';
import { ListaCompraPage } from './../lista-compra/lista-compra';
import { Component } from '@angular/core';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  listaCompra = ListaCompraPage;
  mercados = MercadosPage;
  listaMercado = ListaPage;


  constructor() { }



}
