import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResponseMessage} from "../../../shared/model/response-message";
import {Park} from "../../../shared/model/park";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private parksService: ClientParkService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.dataSource.data.push(new Park(i+1, "park" + (i+1), [], new Date(), new Date()));
    }

    /*this.parksService.getParks().subscribe(
      (res: ResponseMessage) => {
        console.log(res.message)
        this.dataSource = res.data.content
      },
      (err: any) => console.log(err)
    );*/
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  edit(element: any) {

  }

  create() {

  }
}
