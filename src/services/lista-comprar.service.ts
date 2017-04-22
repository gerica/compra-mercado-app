import { Observable } from 'rxjs/Observable';
import { UtilService } from './util.service';
import { ListaComprar } from './../modelo/lista-compar';
import { Injectable } from '@angular/core';

import { Storage } from "@ionic/storage";

@Injectable()
export class ListaComprarService {
    private _NOME_STOREGE = 'listaComprar';
    private _listaComprar: ListaComprar[] = [];

    constructor(private storage: Storage,
        private utilService: UtilService) { }

    public insertLista(listaComprar: ListaComprar): void {
        listaComprar.id = this.utilService.uniqueId();
        this._listaComprar.push(listaComprar);
        const index = this._listaComprar.indexOf(listaComprar);
        this.persistLista(index);

    }
    public updateLista(listaComprar: ListaComprar): void {
        this._listaComprar = this._listaComprar.filter(
            (l: ListaComprar) => l.id !== listaComprar.id);
        this._listaComprar.push(listaComprar);
        const index = this._listaComprar.indexOf(listaComprar);
        this.persistLista(index);

    }

    public getListaCadastrada(): Observable<Set<ListaComprar>> {
        let obj = new Observable(observer => {
            this.fetchLista().then(() => {
                observer.next(this._listaComprar.slice());
                observer.complete();
            });
        });
        return obj;
    }

    public removeListaComprar(listaComprar: ListaComprar): Observable<Object> {
        let obj = new Observable(observer => {
            this.fetchLista().then(() => {
                if (this._listaComprar.length > 0) {
                    if (this._listaComprar !== null) {
                        this._listaComprar = this._listaComprar.filter(
                            (l: ListaComprar) => l.id !== listaComprar.id);
                    } else {
                        this._listaComprar = [];
                    }
                    this.storageListaComprar().then(() => {
                        observer.next('Operação realizada com sucesso.')
                        observer.complete();
                    });
                } else {
                    observer.next('Operação realizada com sucesso.')
                    observer.complete();
                }
            });
        });
        return obj;
    }

    private fetchLista(): Promise<Set<ListaComprar>> {
        return this.storage.get(this._NOME_STOREGE)
            .then(
            lista => {
                console.log(lista);
                this._listaComprar = lista !== null ? lista : [];
                return this._listaComprar.slice();

            }).catch(err => console.error(err));
    }

    private persistLista(...index): void {
        this.storageListaComprar()
            .then()
            .catch(err => {
                if (index) {
                    for (let i of index) {
                        this._listaComprar.splice(i, 1);
                    }
                }
            });
    }

    private storageListaComprar(): Promise<Set<ListaComprar>> {
        return this.storage.set(this._NOME_STOREGE, this._listaComprar);
    }

}