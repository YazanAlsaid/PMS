import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './components/user-app/user-app.component';
import {BuildingComponent} from "./components/building/building.component";
import {SlotComponent} from "./components/slot/slot.component";

const routes: Routes = [
  { path: '', component: UserAppComponent, children:[
      {path:'buildings',component:BuildingComponent,pathMatch: 'full'},
      {path:'slots',component:SlotComponent,pathMatch: 'full'}
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
    SlotComponent
];
