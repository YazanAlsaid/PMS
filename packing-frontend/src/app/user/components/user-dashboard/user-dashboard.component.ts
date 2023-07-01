import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AddReservationComponent} from "../../../shared/components/add-reservation/add-reservation.component";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "../reservation-dialog/reservation-dialog.component";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Reservation {
  parkingName: string;
  building: string;
  floor: string;
  slotNumber: string;
  date: string;
  time: string;
}


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements AfterViewInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  reservations: Reservation[] = [];
  dataSource = new MatTableDataSource(this.reservations);
  displayedColumns: string[] = ['parkingName', 'building', 'floor', 'slotNumber', 'date', 'time', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(public dialog: MatDialog) {
    this.generateDummyData(25); // Generate 25 dummy data rows
  }

  generateDummyData(count: number) {
    for (let i = 1; i <= count; i++) {
      const reservation = {
        parkingName: `Parking ${i}`,
        building: `Building ${i}`,
        floor: `Floor ${i}`,
        slotNumber: `Slot ${i}`,
        date: new Date().toISOString(),
        time: (i%2 == 0)? 'Morning': 'Afternoon',
      };

      this.reservations.push(reservation);
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog() {

    this.dialog.open(AddReservationComponent);
  }

  createReservation() {
    const dialogRef = this.dialog.open(ReservationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  cancelReservation() {}
}
