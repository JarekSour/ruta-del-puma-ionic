import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonInfiniteScroll } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

declare var google;

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {


    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

    id_empresa: number = 0
    nombre: string = ''
    avatar: string = ''
    descripcion: string = ''
    direccion: string = ''
    telefono: string = ''
    coordenadas: string = ''
    email: string = ''

    images: Array<string> = []
    comentarios: Array<any> = []
    page: number = 1;
    stars: number = 0;

    dvShowNotComments: boolean = false

    formComentario: FormGroup

    constructor(
        private route: ActivatedRoute,
        public http: HttpService,
        public navCtrl: NavController,
        private photoViewer: PhotoViewer,
        private geolocation: Geolocation,
        public launchNavigator: LaunchNavigator,
        private diagnostic: Diagnostic,
        private callNumber: CallNumber,
        private emailComposer: EmailComposer,
        private fb: FormBuilder,
        public toast: AlertService) {
        this.formComentario = this.fb.group({
            ID_USUARIO: ['', [Validators.required]],
            ID_EMPRESA: ['', [Validators.required]],
            MESSAGE: [''],
            SCORE: ['', [Validators.required]]
        })
    }

    async ngOnInit() {

        await this.toast.loaderShow()

        this.route.paramMap.subscribe((params: any) => {
            this.id_empresa = params.params.idempresa

            this.http.post(environment.empresa.getEmpresa, { ID_EMPRESA: this.id_empresa }).then((response1: any) => {
                if (response1.status) {
                    this.nombre = response1.data.NAME
                    this.descripcion = response1.data.DESCRIPTION
                    this.direccion = response1.data.ADRESS
                    this.telefono = response1.data.TELEPHONE
                    this.coordenadas = response1.data.LATLON
                    this.loadMap(this.coordenadas);
                    this.email = response1.data.EMAIL

                    this.http.post(environment.imagenes.getAlbum, { hash: response1.data.ALBUM[0].IMGUR_DELETEHASH }).then((response: any) => {
                        if (response.status) {
                            response.data.forEach((el: any) => {
                                if (el.IS_AVATAR) {
                                    this.avatar = el.URL_IMAGEN
                                } else {
                                    this.images.push(el.URL_IMAGEN)
                                }
                            });
                        }

                        setTimeout(async () => {
                            await this.toast.loaderHide()
                        }, 0);
                    })
                }
            }).catch(() => { })
        })
    }

    loadMap(coordenadas) {
        let latLng = new google.maps.LatLng(coordenadas.split(',')[0].trim(), coordenadas.split(',')[1].trim());
        let mapOptions = {
            center: latLng,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            keyboardShortcuts: false,
            styles: [
                {
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }
            ]
        }

        let m = document.getElementById('map')
        let map = new google.maps.Map(m, mapOptions);

        new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: map.getCenter()
        });
    }

    zoom(image) {
        this.photoViewer.show(image);
    }

    showRoute() {
        this.diagnostic.isLocationEnabled().then(async response => {
            if (response) {
                this.geolocation.getCurrentPosition().then(res => {
                    let options: LaunchNavigatorOptions = {
                        start: [res.coords.latitude, res.coords.longitude],
                        appSelection: {
                            dialogHeaderText: 'Selecciona una aplicación',
                            cancelButtonText: 'cancelar',
                            rememberChoice: {
                                prompt: {
                                    headerText: 'Alerta',
                                    bodyText: '¿Recordar elección?',
                                    yesButtonText: 'SI',
                                    noButtonText: 'NO'
                                }
                            }
                        }
                    };

                    this.launchNavigator.navigate(this.coordenadas, options).then();
                })
            } else {
                this.toast.show('Activa tu GPS y reintenta')
            }
        })
    }

    makeCall() {
        this.callNumber.callNumber(`+56${this.telefono}`, true).then();
    }

    sendEmail() {
        this.emailComposer.isAvailable().then((available: boolean) => {
            if (available) {
                let email = {
                    to: this.email,
                    subject: 'Contacto por medio de Ruta del Puma',
                    body: ''
                };

                this.emailComposer.open(email);
            }
        });
    }

    loadCommentarios(event) {

        this.http.post(environment.comentarios.getComentarios, { ID_EMPRESA: this.id_empresa, page: this.page }).then((response: any) => {
            if (response.status) {

                this.comentarios = this.comentarios.concat(response.data.data)
                this.page++

                if (response.data.next_page_url === null) {
                    event.target.disabled = true;
                }

                event.target.complete();
            }

            this.dvShowNotComments = this.comentarios.length == 0 ? true : false
        })
    }

    setPuntuacion(puntuacion: number) {
        this.stars = puntuacion
    }

    async onSubmint() {
        this.formComentario.controls.ID_EMPRESA.setValue(this.id_empresa)
        this.formComentario.controls.ID_USUARIO.setValue(JSON.parse(localStorage.getItem('_r')).ID_USUARIO)
        this.formComentario.controls.SCORE.setValue(this.stars)

        if (this.formComentario.controls.SCORE.value == 0 || this.formComentario.controls.SCORE.errors?.required) {
            this.toast.show('Debes marcar al menos una estrella')
        } else if (this.formComentario.valid) {
            this.http.post(environment.comentarios.sendComentario, this.formComentario.value).then(async (response: any) => {
                if (response.status) {
                    this.comentarios.unshift({
                        DATE: response.data,
                        MESSAGE: this.formComentario.controls.MESSAGE.value,
                        NAME: JSON.parse(localStorage.getItem('_r')).NAME,
                        SCORE: this.formComentario.controls.SCORE.value
                    })

                    this.toast.show('Gracias!')

                    this.formComentario.controls.MESSAGE.setValue('')
                    this.formComentario.controls.SCORE.setValue(0)
                    this.stars = 0
                }
            })
        }

    }

}
