import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MENU } from 'src/app/constants/menu';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-bussines',
    templateUrl: './bussines.component.html',
    styleUrls: ['./bussines.component.scss'],
})
export class BussinesComponent implements OnInit {

    loadingCard: boolean = true

    title: string = '';
    imgType: string = '';
    menu: Array<any> = MENU

    empresas = []

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public http: HttpService) { }


    ngOnInit() {
        this.route.paramMap.subscribe((params: any) => {
            let param = params.params.type
            this.title = this.menu.filter(e => e.name == param)[0].label
            this.imgType = this.menu.filter(e => e.name == param)[0].name

            this.http.post(environment.empresa.getEmpresas, { NAME: this.title }).then((response: any) => {
                if (response.status) {
                    this.empresas = response.data
                }

                this.loadingCard = false
            }).catch((e) => {
                this.title = e
            })


        })
    }

    goToDetalle(id) {
        this.router.navigate([`/detail/${id}`])
    }


}
