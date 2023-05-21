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
    console.log({ this: this });
    this.sideBarOpen = !this.sideBarOpen;
  }
}
