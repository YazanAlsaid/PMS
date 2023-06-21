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

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full'},
      {path: 'buildings', component: BuildingsComponent, pathMatch: 'full', data: {title: 'Building'},},
      {path: 'floors', component: FloorsComponent, pathMatch: 'full', data: {title: 'Floor'},},
      {path: 'slots', component: SlotsComponent, pathMatch: 'full', data: {title: 'Slot'},},
      {path: 'parks', component: ParksComponent, pathMatch: 'full', data: {title: 'Park'},},
      {path: 'users', component: UsersComponent, pathMatch: 'full', data: {title: 'User'},},
      {path: 'roles', component: RolesComponent, pathMatch: 'full', data: {title: 'Role'},},
      {path: 'reservations', component: ReservationsComponent, pathMatch: 'full', data: {title: 'Reservation'},},
      {path: 'nfc-cards', component: NfcCardsComponent, pathMatch: 'full'}
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
