import {Component, OnInit} from '@angular/core';
import {RouteItem} from "../../../shared/model/route-item";

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss']
})
export class AdminAppComponent implements OnInit {

  title = 'Park Management System';
  sideBarOpen = true;
  public routeItems: RouteItem[] = new Array<RouteItem>();

  ngOnInit() {
    this.routeItems.push(new RouteItem('Buildings', '/dashboard/building', 'location_city'));
    this.routeItems.push(new RouteItem('Floors', '/dashboard/floor', 'backup_table'));
    this.routeItems.push(new RouteItem('Slots', '/dashboard/slot', 'space_dashboard'));
    this.routeItems.push(new RouteItem('Park', '/dashboard/park', 'local_parking'));
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
