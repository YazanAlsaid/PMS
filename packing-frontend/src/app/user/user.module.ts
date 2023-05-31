import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedComponent, UserRoutingModule } from './user-routing.module';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { ReservationDialogComponent } from './components/reservation-dialog/reservation-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {FormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
  declarations: [
    RoutedComponent,
    ReservationDialogComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    FormsModule,
    MatCheckboxModule,
    MatNativeDateModule
  ]
})
export class UserModule { }
