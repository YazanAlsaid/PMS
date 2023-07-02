import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Floor} from "../../../shared/model/floor";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public myBreakPoint: number = 4;
  private floors: Floor[] = [];
  public pagedFloors: Floor[] = [];
  private parkId!: number;
  private buildingId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientBuilding: ClientBuildingService,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.parkId = params.parkId;
      this.buildingId = params.buildingId
    });
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['floors'];
    if (resolverData.data){
      this.floors=resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.floors.length;
      this.paginateFloors();
    }else {
      console.log(resolverData.message);
    }

    this.myBreakPoint = (window.innerWidth <= 600) ? 1 : 4;
    if (window.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (window.innerWidth >= 750 && window.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (window.innerWidth >= 550 && window.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (window.innerWidth <= 550)
      this.myBreakPoint = 1;
  }
  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.paginateFloors();
    });
  }

  handleSize(event: any): void {
    if (event.target.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (event.target.innerWidth >= 750 && event.target.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (event.target.innerWidth >= 550 && event.target.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth <= 550)
      this.myBreakPoint = 1;
  }

  onClickFloor(id: number) {
    this.router.navigateByUrl('/user/parks/' + this.parkId + '/buildings/' + this.buildingId + '/floors/' + id + '/slots').then(() => {
    });
  }

  private paginateFloors() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedFloors = this.floors.slice(startIndex, endIndex);
  }
}
