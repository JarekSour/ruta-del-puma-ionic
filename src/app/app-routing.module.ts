import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
    { path: 'index', loadChildren: () => import('./components/index/index.module').then(m => m.IndexModule), canActivate: [LoggedGuard] },
    { path: 'home', loadChildren: () => import('./components/home/home.module').then(m => m.HomePageModule) },
    { path: 'bussines/:type', loadChildren: () => import('./components/bussines/bussines.module').then(m => m.BussinesModule) },
    { path: 'detail/:idempresa', loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule) },
    { path: 'emergencias', loadChildren: () => import('./components/emergency/emergency.module').then(m => m.EmergencyModule) },
    { path: '', redirectTo: 'index', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
