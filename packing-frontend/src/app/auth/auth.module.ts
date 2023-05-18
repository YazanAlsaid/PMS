import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule, RoutedComponent } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RoutedComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
