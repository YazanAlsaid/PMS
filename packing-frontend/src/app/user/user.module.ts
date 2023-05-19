import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedComponent, UserRoutingModule } from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";



@NgModule({
  declarations: [
    RoutedComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule
  ]
})
export class UserModule { }
