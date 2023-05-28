import {Component, Input, OnInit} from '@angular/core';
import {RouteItem} from "../../model/route-item";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input()
  public sideBarOpen = true;
  @Input()
  public routeItems: RouteItem[] = new Array<RouteItem>();
  showFiller: any;

  ngOnInit(): void {
  }
}
