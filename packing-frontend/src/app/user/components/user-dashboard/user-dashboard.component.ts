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
    private clientUser: ClientUserService) {
  }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.clientUser.getReservations(user.id).subscribe(
      (res: any) => {
        res.data.sort((a: any, b:any) => {
          const idA = a.id;
          const idB = b.id;
          return (idA < idB) ?  1: -1;
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

  cancelReservation() {

  }

  edit(element: any) {

  }

  show(element: any) {

  }
}
