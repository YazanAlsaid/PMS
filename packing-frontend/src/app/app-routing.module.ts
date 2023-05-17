import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'auth', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule) },
    { path: 'dashboard', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule) },
    { path: 'home', loadChildren: () => import(`./auth/auth.module`).then(m => m.AuthModule) },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
