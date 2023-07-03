import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientReservationService} from "../../../shared/services/client-reservation.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddReservationDialogComponent} from "../add-reservation-dialog/add-reservation-dialog.component";
import {Reservation} from "../../../shared/model/reservation";
import {DomSanitizer} from "@angular/platform-browser";
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'user', 'reservationAt', 'reservationPeriod', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();
  public pagedReservation: Reservation[] = [];
  public downloadJsonHref: any;

  constructor(private clientReservations: ClientReservationService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer,
              private sanckPopup: SnackPopupService) {
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
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const resolveData = this.activatedRoute.snapshot.data['reservations'];
    if (resolveData.data){
      this.dataSource.data = resolveData.data;
      this.dataSource.paginator = this.paginator;

    } else {
      console.log(resolveData.message);
    }
  }

  edit(element: any) {

  }

  exportReservation() {
    const jsonData = JSON.stringify(this.dataSource.data , null , 2);
    this.downloadJsonHref= this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,'+ encodeURIComponent(jsonData));

  }

  create() {
    const dialogRef = this.dialog.open(AddReservationDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data && data.reservation != null) {
          this.clientReservations.createReservation(data.reservation, data.buildingId, data.floorId, data.slotId).subscribe(
            (res: any) => {
              this.dataSource.data.push(res.data),
              this.sanckPopup.open(res.message);},
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }
}
