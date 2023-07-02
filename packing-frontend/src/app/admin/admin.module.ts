import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule, RoutedComponent} from './admin-routing.module';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SharedModule} from '../shared/shared.module';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {AddUserDialogComponent} from './components/add-user-dialog/add-user-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AddSlotDialogComponent} from "./components/add-slot-dialog/add-slot-dialog.component";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatGridListModule} from "@angular/material/grid-list";
import {AddParkDialogComponent} from './components/add-park-dialog/add-park-dialog.component';
import {MatSortModule} from "@angular/material/sort";
import {AddBuildingDialogComponent} from './components/add-building-dialog/add-building-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AddFloorDialogComponent} from './components/add-floor-dialog/add-floor-dialog.component';
import {AddReservationDialogComponent} from './components/add-reservation-dialog/add-reservation-dialog.component';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    RoutedComponent,
    DashboardComponent,
    AddUserDialogComponent,
    AddSlotDialogComponent,
    AddParkDialogComponent,
    AddBuildingDialogComponent,
    AddFloorDialogComponent,
    AddReservationDialogComponent,
    AddReservationDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatGridListModule,
    MatSortModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatRadioModule,
  ],
})
export class AdminModule {
}
