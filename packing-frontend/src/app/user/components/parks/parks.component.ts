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

  public tiles: Park[] = [];

  constructor(private clientParking: ClientParkService) {
  }

  ngOnInit(): void {
    this.clientParking.getParks().subscribe(
      (response: ResponseMessage) => this.tiles = response.data.content,
      (error: any) => console.log(error.error)
    );
  }

}
