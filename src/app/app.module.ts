import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageDirective } from './directives/image.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HeaderComponent } from './shared/header/header.component';
import { MenuComponent } from './shared/menu/menu.component';

import { GooglePlus } from '@ionic-native/google-plus/ngx'
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { HttpService } from './services/http.service';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator } from '@ionic-native/launch-navigator/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

import { HomePage } from './components/home/home/home.page';
import { IndexComponent } from './components/index/index/index.component';
import { BussinesComponent } from './components/bussines/bussines/bussines.component';
import { DetailComponent } from './components/detail/detail/detail.component';
import { EmergencyComponent } from './components/emergency/emergency/emergency.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        MenuComponent,
        ImageDirective,
        IndexComponent,
        HomePage,
        BussinesComponent,
        DetailComponent,
        EmergencyComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientModule
    ],
    providers: [{
        provide: RouteReuseStrategy,
        useClass: IonicRouteStrategy
    },
        HttpService,
        GooglePlus,
        Facebook,
        TwitterConnect,
        PhotoViewer,
        Geolocation,
        LaunchNavigator,
        Diagnostic,
        CallNumber,
        EmailComposer
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
