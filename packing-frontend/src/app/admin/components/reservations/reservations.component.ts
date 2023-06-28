import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientReservationService} from "../../../shared/services/client-reservation.service";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'reservationAt', 'reservationPeriod', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private clientReservations: ClientReservationService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clientReservations.getReservations().subscribe(
      (res: any) => {
        console.log(res.data);
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {

  }

  create() {

  }

  show(element: any) {

  }
}
