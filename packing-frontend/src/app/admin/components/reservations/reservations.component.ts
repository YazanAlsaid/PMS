import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ClientReservationService} from "../../../shared/services/client-reservation.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddReservationDialogComponent} from "../add-reservation-dialog/add-reservation-dialog.component";
import {Reservation} from "../../../shared/model/reservation";
import {DomSanitizer} from "@angular/platform-browser";
import {SnackPopupService} from 'src/app/shared/services/snack-popup.service';
import { ResponseMessage } from 'src/app/shared/model/response-message';
import { ConfirmationDialogComponent } from 'src/app/user/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public downloadJsonHref: any;
  public searchQuery: any;
  public pagedReservations: Reservation[] = [];
  private filteredReservations: Reservation[] = [];
  private reservations: Reservation[] = [];
  dataSource: any;

  constructor(private clientReservations: ClientReservationService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private sanckPopup: SnackPopupService,
              private clientReservation: ClientReservationService,) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      reservation: null,
      buildingId: null,
      floorId: null,
      slotId: null,
      isUpdate: false,
    }
  };


  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.paginateReservations();
    });
  }

  ngOnInit(): void {
    const resolveData = this.activatedRoute.snapshot.data['reservations'];
    if (resolveData.data) {
      this.reservations = resolveData.data.content.sort((a: any, b:any) => {
        const idA = a.id;
        const idB = b.id;
        return (idA < idB) ? 1 : -1;
      });
      this.filteredReservations = this.reservations;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.reservations.length;
      this.paginateReservations();

    } else {
      console.log(resolveData.message);
    }
  }

  edit(element: any) {

  }

  exportReservations() {
    const jsonData = JSON.stringify(this.pagedReservations, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(jsonData));

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
            const index = this.reservations.findIndex((element: any) => element.id === res.data.id);
            console.log(index);

            if (index !== -1) {
              this.reservations = this.reservations.filter((item: any) => item.id !== res.data.id);
              this.filteredReservations = this.reservations;
            }
            this.paginateReservations();
          },
          (err: any) => console.log(err.error)
        );
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(AddReservationDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data && data.reservation != null) {
          this.clientReservations.createReservation(data.reservation, data.buildingId, data.floorId, data.slotId).subscribe(
            (res: any) => {
              this.reservations.push(res.data);
              this.sanckPopup.open(res.message);
              this.paginateReservations();
            },
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }

  show(element: any) {

  }


  searchReservations() {
    if (this.searchQuery.trim() !== '') {
      this.filteredReservations = this.reservations.filter(reservation =>
        reservation.slot.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.reservationAt.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.reservationPeriod.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        reservation.user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredReservations = this.reservations;
    }
    this.paginateReservations();
  }

  private paginateReservations() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedReservations = this.filteredReservations.slice(startIndex, endIndex);
    this.paginator.length = this.filteredReservations.length;
  }
}
