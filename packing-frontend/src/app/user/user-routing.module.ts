import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';
import { BuildingComponent } from './components/building/building.component';
import { SlotComponent } from './components/slot/slot.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { FloorsComponent } from './components/floors/floors.component';
import { ParksComponent } from './components/parks/parks.component';
import { AuthGuard } from "../auth/guard/auth.guard";
import {FloorsResolveService} from "../shared/services/resolvers/floors-resolve.service";
import {BuildingResolveService} from "../shared/services/resolvers/building-resolve.service";
import {ParksResolveService} from "../shared/services/resolvers/parks-resolve.service";
import {SlotsResolveService} from "../shared/services/resolvers/slots-resolve.service";
import {ReservationsComponent} from "./components/reservations/reservations.component";

const routes: Routes = [
  {
    path: '',
    component: UserAppComponent,
    children: [
      { path: 'dashboard', component: UserDashboardComponent, pathMatch: 'full',canActivate: [AuthGuard], data: { title: 'dashboard', roles: ['user', 'admin']} },
      { path: 'parks',  children:[
          { path: '', component: ParksComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Parks', roles: ['user', 'admin'] },resolve:{parks:ParksResolveService} },
          { path: ':parkId', children:[
              {path:'buildings', children:[
                  { path: '', component: BuildingComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Buildings', roles: ['user', 'admin'] },resolve:{buildings: BuildingResolveService} },
                  { path: ':buildingId', children:[
                      { path: 'floors', children:[
                          { path: '', component: FloorsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Floors', roles: ['user', 'admin'] }, resolve: { floors: FloorsResolveService} },
                          { path: ':floorId', children:[
                              { path: 'slots', component: SlotComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'Slots', roles: ['user', 'admin'] }, resolve: {slots: SlotsResolveService} },
                            ] }
                        ]},
                    ]}
                ] },
            ] },
        ] },
      { path: 'reservations', component: ReservationsComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { title: 'dashboard', roles: ['user', 'admin'] }},
      // ... other routes
      { path: '', redirectTo: '/user/dashboard', pathMatch: 'full', },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

export const RoutedComponent = [
  UserAppComponent,
  UserDashboardComponent,
  BuildingComponent,
  FloorsComponent,
  SlotComponent,
  ParksComponent,
  ReservationsComponent
];
