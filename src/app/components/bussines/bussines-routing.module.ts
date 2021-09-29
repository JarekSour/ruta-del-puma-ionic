import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BussinesComponent } from './bussines/bussines.component';

const routes: Routes = [
    { path: '', component: BussinesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BussinesRoutingModule { }
