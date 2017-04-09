import { ModalListaComprarItemPage } from './../pages/lista/modal/modal-lista-comprar-item';
import { OpcaoListaComprarPage } from './../pages/lista/opcao-lista-comprar';
import { ListaComprarService } from './../services/lista-comprar.service';
import { ListaComprarPage } from './../pages/lista/lista-comprar/lista-comprar';
import { ListaPage } from './../pages/lista/lista';
import { UtilService } from './../services/util.service';
import { ModalOpcaoMercaoPage } from './../pages/mercados/modal-opcao-mercado';
import { OpcaoMercadoPage } from './../pages/mercados/opcao-mercado';
import { CompraService } from './../services/compra.service';
import { MercadoSerice } from './../services/mercado.service';
import { IonicStorageModule } from '@ionic/storage';
import { ModalListaItemPage } from './../pages/lista-compra/modal/modal-lista-item';
import { OpcaoListCompraPage } from './../pages/lista-compra/opcao-lista-compra';
import { OpcaoItemCompraPage } from './../pages/comprar/opcao-item-compra';
import { ModalOpcaoItemCompraPage } from './../pages/comprar/modal-opcao-item-compra';
import { ItemCompraPage } from './../pages/item-compra/item-compra';
import { MercadoPage } from './../pages/mercado/mercado';
import { TabsPage } from './../pages/tabs/tabs';
import { MercadosPage } from './../pages/mercados/mercados';
import { ListaCompraPage } from './../pages/lista-compra/lista-compra';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ComprarPage } from "../pages/comprar/comprar";
import { OpcaoListaPage } from "../pages/lista-compra/opcao-lista";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ListaCompraPage,
    ListaPage,
    MercadoPage,
    MercadosPage,
    ComprarPage,
    ItemCompraPage,
    OpcaoItemCompraPage,
    ModalOpcaoItemCompraPage,
    OpcaoListCompraPage,
    ModalListaItemPage,
    ModalOpcaoMercaoPage,
    OpcaoMercadoPage,
    OpcaoListaPage,
    ListaComprarPage,
    OpcaoListaComprarPage,
    ModalListaComprarItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListaCompraPage,
    ListaPage,
    MercadoPage,
    MercadosPage,
    ComprarPage,
    ItemCompraPage,
    OpcaoItemCompraPage,
    ModalOpcaoItemCompraPage,
    OpcaoListCompraPage,
    ModalListaItemPage,
    ModalOpcaoMercaoPage,
    OpcaoMercadoPage,
    OpcaoListaPage,
    ListaComprarPage,
    OpcaoListaComprarPage,
    ModalListaComprarItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MercadoSerice,
    CompraService,
    UtilService,
    ListaComprarService,
    Storage,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
