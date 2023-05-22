import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';
import {BuildingComponent} from "./components/building/building.component";
import {SlotComponent} from "./components/slot/slot.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  { path: '', component: UserAppComponent, children:[
      {path:'buildings',component:BuildingComponent,pathMatch: 'full'},
      {path:'slots',component:SlotComponent,pathMatch: 'full'},
      {path:'login' , component :LoginComponent , pathMatch: 'full'},
      {path:'singun' , component :LoginComponent , pathMatch: 'full'}

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
    SlotComponent,
  LoginComponent
];
