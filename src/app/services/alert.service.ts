import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    loader: any;

    constructor(
        public toastController: ToastController,
        public loadingController: LoadingController) { }

    async show(msg: string, time = 2000) {
        const toast = await this.toastController.create({
            message: msg,
            duration: time
        });
        toast.present();
    }

    async loaderShow() {
        this.loader = await this.loadingController.create({
            cssClass: 'custom-loader-class',
            message: 'Cargando datos...',
        });
        await this.loader.present();
    }

    loaderHide() {
        this.loader.dismiss().then((res) => {
            console.log('Loading dismissed!', res);
        }).catch((error) => {
            console.log('error', error);
        });
    }
}
