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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 12, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 13, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 14, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 15, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 16, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 17, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 18, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 19, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 20, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

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
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  cancelReservation() {

  }
}










