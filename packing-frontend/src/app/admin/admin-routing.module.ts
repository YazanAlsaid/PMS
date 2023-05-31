import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAppComponent } from './components/admin-app/admin-app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      {
        path: 'building',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Building' },
      },
      {
        path: 'floor',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Floor' },
      },
      {
        path: 'slot',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Slot' },
      },
      {
        path: 'park',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Park' },
      },
      {
        path: 'user',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'User' },
      },
      {
        path: 'role',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Role' },
      },
      {
        path: 'reservations',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'Reservation' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

export const RoutedComponent = [AdminAppComponent, DashboardComponent];
