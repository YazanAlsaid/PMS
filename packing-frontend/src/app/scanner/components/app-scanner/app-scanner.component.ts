import { Component } from '@angular/core';

@Component({
  selector: 'app-app-scanner',
  templateUrl: './app-scanner.component.html',
  styleUrls: ['./app-scanner.component.scss']
})
export class AppScannerComponent {
  public readonly title = 'Park Management System';
  public sideBarOpen = true;

  toggleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
