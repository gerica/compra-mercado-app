import { Compra } from './../../modelo/compra';
import { CompraService } from './../../services/compra.service';
import { Component } from '@angular/core';



@Component({
  selector: 'page-lista-compra',
  templateUrl: 'lista-compra.html',
  providers: [CompraService]
})
export class ListaCompraPage {
  compras: Compra[];

  constructor(private compraService: CompraService) { }

  ionViewWillEnter() {
    console.clear();
    this.getCompras();
  }

  private getCompras(): void {
    this.compraService.getComprasRealizadas().subscribe(
      (data: Compra[]) => {
        this.compras = data;
      }
    );
  }

}
