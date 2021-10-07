import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { TwitterConnect } from '@numetalsour/twitter-connect/ngx';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

    constructor(
        public http: HttpService,
        private router: Router,
        private googlePlus: GooglePlus,
        private facebook: Facebook,
        private twitter: TwitterConnect,
        public toast: AlertService
    ) { }

    ngOnInit() { }

    googleSignIn() {
        this.googlePlus.login({})
            .then((result: any) => {
                console.log(result)
                this.login({ userID: result.userId, NAME: `${result.givenName} ${result.familyName}`, EMAIL: result.email, IMG_URL: result.imageUrl }, 'google')
            })
            .catch(() => this.toast.show('Reintente más tarde... (GE10)'))

    }

    facebookSignIn() {
        this.facebook.login(['public_profile', 'email'])
            .then((response: FacebookLoginResponse) => {
                const userId = response.authResponse.userID

                if (response.status === 'connected') {
                    this.getUserDetail(userId)
                }
            })
            .catch(() => this.toast.show('Reintente más tarde... (FE10)'));
    }

    getUserDetail(userid: any) {
        this.facebook.api('/' + userid + '/?fields=id,email,name,picture.width(200).height(200)', ['public_profile'])
            .then(res => {
                this.login({ userID: res.id, NAME: res.name, EMAIL: res.email, IMG_URL: res.picture.data.url }, 'facebook')
            })
            .catch(e => this.toast.show('Reintente más tarde... (FE20)'));
    }

    twitterSignIn() {
        this.twitter.login()
            .then(res => {
                let user = { userId: '', name: '', email: '', photo: '' }
                user.userId = res.userId
                this.twitter.verifyCredentials().then((respose: any) => {
                    console.log('respose', respose)
                }).catch(err => {
                    console.log('Reintente más tarde... (TE20)')
                    this.login({ userID: res.userId, NAME: err.name, EMAIL: err.email, IMG_URL: err.profile_image_url_https.replace('_normal', '') }, 'twitter')
                })
            }, (e) => {
                console.log(e)
                this.toast.show('Reintente más tarde... (TE10)')
            })
    }

    async login(obj, provider) {
        await this.toast.loaderShow()
        this.http.post(environment.usuario.login, obj).then(async (response: any) => {
            if (response.status) {
                await this.toast.loaderHide()
                obj.ID_USUARIO = response.data
                obj.PROVIDER = provider

                localStorage.setItem('_r', JSON.stringify(obj))
                this.router.navigate([`/home`]);
            }
        }).catch(async (e) => {
            await this.toast.loaderHide()
            this.toast.show('Reintente más tarde... (LE10)')
        })
    }

}
