import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {AddReservationComponent} from "../../../shared/components/add-reservation/add-reservation.component";
import {MatDialog} from "@angular/material/dialog";
import {ReservationDialogComponent} from "../reservation-dialog/reservation-dialog.component";
import {ClientUserService} from "../../../shared/services/client-user.service";
import {StorageService} from "../../../auth/Services/storage.service";
import {Reservation} from "../../../shared/model/reservation";
import {ResponseMessage} from "../../../shared/model/response-message";
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ClientReservationService } from 'src/app/shared/services/client-reservation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Reservation>();
  //displayedColumns: string[] = ['parkingName', 'building', 'floor', 'slotNumber', 'date', 'time', 'action'];
  public readonly displayedColumns: string[] = ['id', 'slot', 'reservationAt', 'reservationPeriod', 'createdAt', 'updatedAt', 'action'];


  constructor(
    public dialog: MatDialog,
    private storageService: StorageService,
    private clientReservation: ClientReservationService,
    private clientUser: ClientUserService,
    ) {
  }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.clientUser.getReservations(user.id).subscribe(
      (res: any) => {
        res.data.sort((a: any, b:any) => {
          const idA = a.id;
          const idB = b.id;
          return (idA < idB) ? 1 : -1;
        });
        this.dataSource.data = res.data;
      },
      (err: any) => console.log(err.error)
    )
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
    });
  }

  cancelReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to cancel this reservation?'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // Call the API to cancel the reservation
        this.clientReservation.cancelReservation(reservation.id).subscribe(
          (res: ResponseMessage) => {
            // Update the dataSource after successful cancellation
            const index = this.dataSource.data.findIndex((element) => element.id === res.data.id);
            console.log(index);

            if (index !== -1) {
              this.dataSource.data = this.dataSource.data.filter((item: any) => item.id !== res.data.id);
              this.dataSource.data = this.dataSource.data.sort((a: any, b:any) => {
                const idA = a.id;
                const idB = b.id;
                return (idA < idB) ? 1 : -1;
              });
              this.dataSource._updateChangeSubscription();
            }
          },
          (err: any) => console.log(err.error)
        );
      }
    });
  }


  edit(element: any) {

  }

  show(element: any) {

  }
}
