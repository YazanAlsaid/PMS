import {Component, OnInit} from '@angular/core';
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {Floor} from "../../../shared/model/floor";

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  free: number;
  frauen: number;
  eAuto: number;
  disability: number;
}

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {

  public floors: Floor[] = [];
  public myBreakPoint: number = 4;

  constructor(private clientFloor: ClientFloorService) {
  }

  ngOnInit(): void {
    this.clientFloor.getFloors().subscribe(
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
}
