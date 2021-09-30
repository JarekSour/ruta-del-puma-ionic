import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MENU } from 'src/app/constants/menu';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    menu: Array<any> = MENU

    constructor(private router: Router) { }

    ngOnInit() { }

    openEmergencias() {
        this.router.navigate(['/emergencias'])
    }
}
