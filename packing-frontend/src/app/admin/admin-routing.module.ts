import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponent } from './components/admin-app/admin-app.component';

const routes: Routes = [
    { path: '', component: AdminAppComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }

export const RoutedComponent = [
    AdminAppComponent
];