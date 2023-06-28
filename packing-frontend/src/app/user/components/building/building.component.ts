import {Component, OnInit} from '@angular/core';
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {Building} from "../../../shared/model/building";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})


export class BuildingComponent implements OnInit {

  public myBreakPoint: number = 0
  public buildings: Building[] = [];

  constructor(private clientBuilding: ClientBuildingService) {
  }

  ngOnInit(): void {
    this.clientBuilding.getBuildings().subscribe(
      (res: any) => this.buildings = res.data,
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


  handleSize(event: any) {
    if (event.target.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (event.target.innerWidth >= 750 && event.target.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (event.target.innerWidth >= 550 && event.target.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth <= 550)
      this.myBreakPoint = 1;
  }
}
