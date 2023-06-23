import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAppComponent } from './components/auth-app/auth-app.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
    { path: '', component: AuthAppComponent, children: [
      {path: 'login', component: LoginComponent, pathMatch: 'full'},
      {path: '', redirectTo: 'login', pathMatch: 'full'}
    ] }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }

export const RoutedComponent = [
    AuthAppComponent,
    LoginComponent
];
