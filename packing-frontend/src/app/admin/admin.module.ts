import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, RoutedComponent } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';



@NgModule({
  declarations: [
    RoutedComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
