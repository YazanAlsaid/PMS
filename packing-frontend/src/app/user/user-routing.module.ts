import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';

const routes: Routes = [
    { path: '', component: UserAppComponent, pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }

export const RoutedComponent = [
    UserAppComponent
];