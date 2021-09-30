import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EMERGENCIAS } from 'src/app/constants/emergencias';

@Component({
    selector: 'app-emergency',
    templateUrl: './emergency.component.html',
    styleUrls: ['./emergency.component.scss'],
})
export class EmergencyComponent implements OnInit {

    emergencias: Array<any> = EMERGENCIAS

    constructor(private callNumber: CallNumber) { }

    ngOnInit() { }

    callEmergencia(numero: any) {
        this.callNumber.callNumber(numero, true).then();
    }

}
