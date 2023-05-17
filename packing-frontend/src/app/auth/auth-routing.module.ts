import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAppComponent } from './components/auth-app/auth-app.component';

const routes: Routes = [
    { path: '', component: AuthAppComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }

export const RoutedComponent = [
    AuthAppComponent
];