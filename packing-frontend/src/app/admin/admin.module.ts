import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule, RoutedComponent } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [RoutedComponent, DashboardComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
