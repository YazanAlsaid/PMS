import {Component, OnInit} from '@angular/core';
import {RouteItem} from '../../../shared/model/route-item';

@Component({
  selector: 'app-admin-app',
  templateUrl: './admin-app.component.html',
  styleUrls: ['./admin-app.component.scss'],
})
export class AdminAppComponent implements OnInit {
  title = 'Park Management System';
  sideBarOpen = true;
  public routeItems: RouteItem[] = [
    {name: 'Park', link: '/dashboard/parks', icon: 'local_parking',},
    {name: 'Buildings', link: '/dashboard/buildings', icon: 'location_city',},
    {name: 'Floors', link: '/dashboard/floors', icon: 'backup_table',},
    {name: 'Slots', link: '/dashboard/slots', icon: 'space_dashboard',},
    {name: 'Reservations', link: '/dashboard/reservations', icon: 'list_alt',},
    {name: 'Users', link: '/dashboard/users', icon: 'person',},
    {name: 'Roles', link: '/dashboard/roles', icon: 'admin_panel_settings',},
    {name: 'NFC Cards', link: '/dashboard/nfc-cards', icon: 'card_membership',},
  ];

  ngOnInit() {
  }

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
