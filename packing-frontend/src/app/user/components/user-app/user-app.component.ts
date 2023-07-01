import {Component, OnInit} from '@angular/core';
import {RouteItem} from "../../../shared/model/route-item";

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.scss']
})

export class UserAppComponent implements OnInit {
  title = 'Park Management System';
  public routeItems: RouteItem[] = new Array<RouteItem>();
  public sideBarOpen: boolean = true;

  ngOnInit(): void {
    this.routeItems.push(new RouteItem("Dashboard", "/user/dashboard", "dashboard"));
    this.routeItems.push(new RouteItem("Parks", "/user/parks", "location_city"));
    this.routeItems.push(new RouteItem('Reservations', '/user/reservations', 'list_alt'));
    /*    this.routeItems.push(new RouteItem("Buildings", "/user/buildings", "location_city"));
        this.routeItems.push(new RouteItem("Floors", "/user/floors", "location_city"));
        this.routeItems.push(new RouteItem("Slots", "/user/slots", "space_dashboard"));*/
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
