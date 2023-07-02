import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientReservationService} from "../../../shared/services/client-reservation.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'user', 'reservationAt', 'reservationPeriod', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private clientReservations: ClientReservationService,
              private activatedRoute: ActivatedRoute) {
  }

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

  create() {

  }

  show(element: any) {

  }
}
