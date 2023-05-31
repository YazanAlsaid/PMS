import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';
import {BuildingComponent} from "./components/building/building.component";
import {SlotComponent} from "./components/slot/slot.component";
import {UserDashboardComponent} from "./components/user-dashboard/user-dashboard.component";
import {FloorsComponent} from "./components/floors/floors.component";
import {ParksComponent} from "./components/parks/parks.component";

const routes: Routes = [
  { path: '', component: UserAppComponent, children:[
      {path:'dashboard',component:UserDashboardComponent,pathMatch: 'full'},
      {path:'buildings',component:BuildingComponent,pathMatch: 'full'},
      {path:'floors',component:FloorsComponent,pathMatch: 'full'},
      {path:'slots',component:SlotComponent,pathMatch: 'full'},
      {path:'parks',component:ParksComponent,pathMatch: 'full'}
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UserRoutingModule { }

export const RoutedComponent = [
    UserAppComponent,
    BuildingComponent,
    FloorsComponent,
    SlotComponent,
    UserDashboardComponent,
    ParksComponent
];
