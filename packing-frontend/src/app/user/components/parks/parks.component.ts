import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Park} from "../../../shared/model/park";
import {ActivatedRoute, Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public myBreakPoint: number = 4;
  private parks: Park[] = [];
  public pagedParks: any[] = [];

  constructor(
    private clientParking: ClientParkService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['parks'];
    if (resolverData.data) {
      this.parks = resolverData.data.content;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.parks.length;
      this.paginateParks();
    } else {
      console.log(resolverData.message);
    }

    this.myBreakPoint = (window.innerWidth <= 600) ? 1 : 4;
    if (window.innerWidth > 950)
      this.myBreakPoint = 2;
    else if (window.innerWidth >= 750 && window.innerWidth <= 950)
      this.myBreakPoint = 2;
    else if (window.innerWidth >= 550 && window.innerWidth <= 750)
      this.myBreakPoint = 1;
    else if (window.innerWidth <= 550)
      this.myBreakPoint = 1;

    this.paginator.page.subscribe(() => {
      this.paginateParks();
    });
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.paginateParks();
    });
  }

  paginateParks() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedParks = this.parks.slice(startIndex, endIndex);
  }

  handleSize(event: any) {
    if (event.target.innerWidth > 950)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth >= 750 && event.target.innerWidth <= 950)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth >= 550 && event.target.innerWidth <= 750)
      this.myBreakPoint = 1;
    else if (event.target.innerWidth <= 550)
      this.myBreakPoint = 1;
  }

  onClickPark(id: number) {
    this.router.navigateByUrl('/user/parks/' + id + '/buildings').then(() => {
    });
  }
}
