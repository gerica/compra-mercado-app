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

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ListaCompraPage,
    MercadoPage,
    MercadosPage,
    ComprarPage,
    ItemCompraPage,
    OpcaoItemCompraPage,
    ModalOpcaoItemCompraPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ListaCompraPage,
    MercadoPage,
    MercadosPage,
    ComprarPage,
    ItemCompraPage,
    OpcaoItemCompraPage,
    ModalOpcaoItemCompraPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
