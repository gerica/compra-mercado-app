import { Component } from '@angular/core';
import { LoadingController, ToastController, Toast, Loading } from "ionic-angular";

@Component({
    selector: 'base-page',
    template: ''
})
export class BasePage {
    protected loading: Loading;
    protected toast: Toast;

    constructor(protected loadingCtrl: LoadingController,
        protected toastCtrl: ToastController) { }


    protected createLoading(content: string): void {
        this.loading = this.loadingCtrl.create({
            content: content
        });
        this.loading.present();
    }

    protected createToast(message: string) {
        this.toast = this.toastCtrl.create({
            message: message,
            position: 'bottom',
            duration: 2000,
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        this.toast.present();
    }


}
