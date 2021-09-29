import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    @Input() public onClick = () => { }
    user = {
        ID_USUARIO: '',
        userID: '',
        NAME: '',
        EMAIL: '',
        IMG_URL: '',
        PROVIDER: ''
    }

    constructor(
        private router: Router,
        private googlePlus: GooglePlus,
        private facebook: Facebook,
        private twitter: TwitterConnect
    ) { }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('_r'))
    }

    closeSession() {
        switch (this.user.PROVIDER) {
            case 'google':
                this.googlePlus.logout()
                    .then(e => console.log('success', e))
                    .catch(e => console.log('error', e))
                    .finally(() => {
                        localStorage.clear()
                        this.onClick();
                        this.router.navigate([`/index`]);
                    })
                break;
            case 'facebook':
                this.facebook.logout()
                    .then(e => console.log('success', e))
                    .catch(e => console.log('error', e))
                    .finally(() => {
                        localStorage.clear()
                        this.onClick();
                        this.router.navigate([`/index`]);
                    })
                break;
            case 'twitter':
                this.twitter.logout()
                    .then(e => console.log('success', e))
                    .catch(e => console.log('error', e))
                    .finally(() => {
                        localStorage.clear()
                        this.onClick();
                        this.router.navigate([`/index`]);
                    })
                break;
        }
    }

}
