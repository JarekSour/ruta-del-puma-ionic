import { Directive, Input, OnInit } from '@angular/core';
import { MENU } from '../constants/menu';

@Directive({
    selector: '[img-preloader]',
    host: {
        '[attr.src]': 'finalImage'
    }
})
export class ImageDirective implements OnInit {

    @Input('img-preloader') targetSource: string;
    @Input('img-type') targetType: string;

    downloadingImage: any;
    finalImage: any;

    constructor() { }

    ngOnInit() {

        switch (this.targetType) {
            case 'avatar':
                this.finalImage = 'assets/default/avatar.svg'
                break;
            case 'como-llegar':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
            case 'comercio':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
            case 'donde-comer':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
            case 'donde-dormir':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
            case 'salud-belleza':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
            case 'visitar':
                this.finalImage = 'assets/default/' + MENU.filter(e => e.name == this.targetType)[0].img
                break;
        }

        this.downloadingImage = new Image()
        this.downloadingImage.onload = () => {
            this.finalImage = this.targetSource;
        }

        this.downloadingImage.src = this.targetSource;
    }
}
