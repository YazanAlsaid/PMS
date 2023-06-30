import {Component, OnInit} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Park} from "../../../shared/model/park";
import {ResponseMessage} from "../../../shared/model/response-message";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements OnInit {

  public myBreakPoint: number = 4;
  public tiles: Park[] = [];

  constructor(private clientParking: ClientParkService) {
  }

  ngOnInit(): void {
    this.clientParking.getParks().subscribe(
      (response: ResponseMessage) => this.tiles = response.data.content,
      (error: any) => console.log(error.error)
    );
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
