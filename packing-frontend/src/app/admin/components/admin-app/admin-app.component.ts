import { Component, OnInit } from '@angular/core';
import { RouteItem } from '../../../shared/model/route-item';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss'],
})
export class AdminAppComponent implements OnInit {
  title = 'Park Management System';
  sideBarOpen = true;
  public routeItems: RouteItem[] = [
    {
      name: 'Park',
      link: '/dashboard/park',
      icon: 'local_parking',
    },
    {
      name: 'Buildings',
      link: '/dashboard/building',
      icon: 'location_city',
    },
    {
      name: 'Floors',
      link: '/dashboard/floor',
      icon: 'backup_table',
    },
    {
      name: 'Slots',
      link: '/dashboard/slot',
      icon: 'space_dashboard',
    },
    {
      name: 'Users',
      link: '/dashboard/user',
      icon: 'person',
    },
    {
      name: 'Roles',
      link: '/dashboard/role',
      icon: 'admin_panel_settings',
    },
    {
      name: 'Reservations',
      link: '/dashboard/reservations',
      icon: 'list_alt',
    },
  ];

  ngOnInit() {}

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
