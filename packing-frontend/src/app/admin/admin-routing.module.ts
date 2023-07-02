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
import {BuildingsResolveService} from "./services/buildings-resolve.service";
import {FloorsResolveService} from "./services/floors-resolve.service";
import {SlotsResolveService} from "./services/slots-resolve.service";
import {ParksResolveService} from "./services/parks-resolve.service";
import {UsersResolveService} from "./services/users-resolve.service";
import {RolesResolveService} from "../shared/services/resolvers/roles-resolve.service";
import {RolesRosolveService} from "./services/roles-rosolve.service";
import {NfcKardsRosloveService} from "./services/nfc-kards-roslove.service";
import {ReservationsResolveService} from "../shared/services/resolvers/reservations-resolve.service";
import {ReservationResolveService} from "./services/reservation-resolve.service";

const routes: Routes = [
  {
    path: '',
    component: AdminAppComponent,
    children: [
      {path: '', component: DashboardComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'dashboard', roles: ['admin'] }},
      {path: 'buildings', component: BuildingsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Buildings', roles: ['admin'] },resolve:{buildings:BuildingsResolveService} },
      {path: 'floors', component: FloorsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'floors', roles: ['admin'] },resolve:{floors:FloorsResolveService}},
      {path: 'slots', component: SlotsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'slots', roles: ['admin'] },resolve:{slots:SlotsResolveService}},
      {path: 'parks', component: ParksComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'parks', roles: ['admin'] },resolve:{parks:ParksResolveService}},
      {path: 'users', component: UsersComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'users', roles: ['admin'] },resolve:{users:UsersResolveService}},
      {path: 'roles', component: RolesComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'roles', roles: ['admin'] },resolve:{roles:RolesRosolveService}},
      {path: 'reservations', component: ReservationsComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'reservations', roles: ['admin'] },resolve:{reservations:ReservationResolveService}},
      {path: 'nfc-cards', component: NfcCardsComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'nfc-cards', roles: ['admin'] },resolve:{nfcCards:NfcKardsRosloveService}},
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
