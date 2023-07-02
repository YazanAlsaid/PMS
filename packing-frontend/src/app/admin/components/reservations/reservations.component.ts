import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientReservationService} from "../../../shared/services/client-reservation.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddReservationComponent} from "../../../shared/components/add-reservation/add-reservation.component";
import {ReservationDialogComponent} from "../../../user/components/reservation-dialog/reservation-dialog.component";
import {AddReservationDialogComponent} from "../add-reservation-dialog/add-reservation-dialog.component";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id','user', 'reservationAt', 'reservationPeriod', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private clientReservations: ClientReservationService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      reservation: null,
      isUpdate: false,
    }
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
   /* this.clientReservations.getReservations().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    )*/
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

  create() {
    const dialogRef = this.dialog.open(AddReservationDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.reservation != null) {
          this.clientReservations.createReservation(data.reservation).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }
}
