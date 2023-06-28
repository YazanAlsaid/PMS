import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminAppComponent} from './components/admin-app/admin-app.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {ParksComponent} from "./components/parks/parks.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {BuildingsComponent} from "./components/buildings/buildings.component";
import {SlotsComponent} from "./components/slots/slots.component";
import {UsersComponent} from "./components/users/users.component";
import {RolesComponent} from "./components/roles/roles.component";
import {ReservationsComponent} from "./components/reservations/reservations.component";
import {NfcCardsComponent} from "./components/nfc-cards/nfc-cards.component";
import { AuthGuard } from '../auth/guard/auth.guard';
import { ForbiddenComponent } from '../shared/components/forbidden/forbidden.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'dashboard', roles: ['admin'] }},
      {path: 'buildings', component: BuildingsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Buildings', roles: ['admin'] }},
      {path: 'floors', component: FloorsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'floors', roles: ['admin'] }},
      {path: 'slots', component: SlotsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'slots', roles: ['admin'] }},
      {path: 'parks', component: ParksComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'parks', roles: ['admin'] }},
      {path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'users', roles: ['admin'] }},
      {path: 'roles', component: RolesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'roles', roles: ['admin'] }},
      {path: 'reservations', component: ReservationsComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'reservations', roles: ['admin'] }},
      {path: 'nfc-cards', component: NfcCardsComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'nfc-cards', roles: ['admin'] }},
      {path: 'forbidden', component: ForbiddenComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'forbidden', roles: ['user'] }}
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
  NfcCardsComponent,
  ParksComponent,
  ReservationsComponent,
  RolesComponent,
  SlotsComponent,
  UsersComponent,
];
