import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-routing.module';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HomePageRoutingModule,
        MaterialModule
    ],
})
export class HomePageModule { }
