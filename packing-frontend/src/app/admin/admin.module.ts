import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, RoutedComponent } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [RoutedComponent, DashboardComponent],
  imports: [CommonModule, AdminRoutingModule, MatSidenavModule],
})
export class AdminModule {}
