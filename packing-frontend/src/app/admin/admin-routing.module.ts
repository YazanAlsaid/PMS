import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAppComponent} from './components/admin-app/admin-app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ParksComponent} from "./components/parks/parks.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {BuildingsComponent} from "./components/buildings/buildings.component";

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {
        path: 'building',
        component: BuildingsComponent,
        pathMatch: 'full',
        data: {title: 'Building'},
      },
      {
        path: 'floor',
        component: FloorsComponent,
        pathMatch: 'full',
        data: {title: 'Floor'},
      },
      {
        path: 'slot',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {title: 'Slot'},
      },
      {
        path: 'park',
        component: ParksComponent,
        pathMatch: 'full',
        data: {title: 'Park'},
      },
      {
        path: 'user',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {title: 'User'},
      },
      {
        path: 'role',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {title: 'Role'},
      },
      {
        path: 'reservations',
        component: DashboardComponent,
        pathMatch: 'full',
        data: {title: 'Reservation'},
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}

export const RoutedComponent = [
  AdminAppComponent,
  BuildingsComponent,
  DashboardComponent,
  FloorsComponent,
  ParksComponent
];
