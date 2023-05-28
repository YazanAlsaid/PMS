import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterLink, RouterOutlet } from "@angular/router";
import { AddReservationComponent } from './components/add-reservation/add-reservation.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    NavComponent,
    SidebarComponent,
    AddReservationComponent
  ],
    imports: [
        CommonModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        RouterLink,
        RouterOutlet,
        MatDialogModule
    ], exports: [
    NavComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
