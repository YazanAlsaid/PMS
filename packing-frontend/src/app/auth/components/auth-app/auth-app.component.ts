import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-app',
  templateUrl: './auth-app.component.html',
  styleUrls: ['./auth-app.component.scss']
})
export class AuthAppComponent {
  title = 'Park Management System';

  sideBarOpen = true;
  toogleSideBar() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
