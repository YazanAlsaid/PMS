import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Park Management System';

  sideBarOpen = true;
  toogleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
