import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Role} from "../../../shared/model/role";
import {Reservation} from "../../../shared/model/reservation";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'from', 'to', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.dataSource.data.push(new Reservation(i + 1, new Date(), new Date(), new Date, new Date))
    }
  }

  edit(element: any) {

  }

  create() {

  }

  show(element: any) {

  }
}
