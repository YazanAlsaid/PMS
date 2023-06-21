import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Park Management System';

  ngOnInit(): void {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMUB1c2VyLmNvbSIsImV4cCI6MTY4Njc3NjEyNywiaWF0IjoxNjg2NzQwMTI3fQ.FSTQ6pk7aObiD7vNJSkd1IzfFCWyaRrHMWyCMV2NeQ0");
  }

}
