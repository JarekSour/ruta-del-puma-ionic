import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { MenuComponent } from '../menu/menu.component';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

    constructor(public popoverController: PopoverController) { }

    ngOnInit() { }

    async showMenu(ev: any) {
        const popover = await this.popoverController.create({
            component: MenuComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true,
            componentProps: {
                onClick: () => {
                    popover.dismiss();
                },
            }
        });
        await popover.present();

        const { role } = await popover.onDidDismiss();
    }

}
