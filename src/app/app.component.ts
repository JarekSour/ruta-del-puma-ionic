import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {

    @ViewChild('splash', { static: false }) splash: ElementRef
    routerHidden: boolean = true

    constructor(
        private platform: Platform,
        private router: Router,
        private navController: NavController
    ) {
        this.initializeApp()
    }

    initializeApp() {
        this.platform.ready().then(() => {

            setTimeout(() => {
                this.routerHidden = false
                this.splash.nativeElement.style.display = 'none';

                this.platform.backButton.subscribeWithPriority(10, () => {
                    const url = this.router.url;
                    if (url === '/index' || url === '/home') {
                        navigator['app'].exitApp();
                    } else {
                        this.navController.back();
                    }
                });
            }, 2000);
        })
    }
}
