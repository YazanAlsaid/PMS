import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedComponent, UserRoutingModule } from './user-routing.module';



@NgModule({
  declarations: [
    RoutedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
