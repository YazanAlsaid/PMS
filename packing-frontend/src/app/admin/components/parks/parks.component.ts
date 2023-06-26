import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResponseMessage} from "../../../shared/model/response-message";
import {Park} from "../../../shared/model/park";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource!: MatTableDataSource<Park>;

  constructor(private parksService: ClientParkService) {
  }

  ngOnInit(): void {
    this.parksService.getParks().subscribe(
      (res: ResponseMessage) => {
        this.dataSource = new MatTableDataSource<Park>(res.data.content)
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    );
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  edit(element: any) {

  }

  create() {

  }

  show(element: any) {

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
