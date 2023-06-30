import {Component, OnInit} from '@angular/core';
import {Floor} from "../../../shared/model/floor";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientBuildingService} from "../../../shared/services/client-building.service";

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {

  public floors: Floor[] = [];
  public myBreakPoint: number = 4;
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
    this.clientBuilding.getFloors(this.buildingId).subscribe(
      (res: any) => this.floors = res.data,
      (err: any) => console.log(err)
    )

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
    console.log('/user/parks/' + this.parkId + '/buildings/' + this.buildingId + '/floors/' + id + '/slots')
    this.router.navigateByUrl('/user/parks/' + this.parkId + '/buildings/' + this.buildingId + '/floors/' + id + '/slots').then(() => {
    });
  }
}
