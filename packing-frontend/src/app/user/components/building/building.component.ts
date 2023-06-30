import {Component, OnInit} from '@angular/core';
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {Building} from "../../../shared/model/building";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientParkService} from "../../../shared/services/client-park.service";

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})


export class BuildingComponent implements OnInit {
  private parkId!: number;
  public myBreakPoint: number = 0
  public buildings: Building[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private clientBuilding: ClientBuildingService,
    private clientPark: ClientParkService,
    private router: Router) {
    this.activatedRoute.params.subscribe((params: any) => this.parkId = params.parkId);

  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['buildings'];
    if (resolverData.data){
      this.buildings=resolverData.data;
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

  onClickBuilding(id: number) {
    this.router.navigateByUrl('/user/parks/' + this.parkId + '/buildings/'+ id + '/floors').then(() => {
    });
  }
}
