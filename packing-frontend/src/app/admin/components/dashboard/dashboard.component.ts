import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from '../add-user-dialog/add-user-dialog.component';
import {AddSlotDialogComponent} from "../add-slot-dialog/add-slot-dialog.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  sub: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) {
  }

  data: Data | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((v) => (this.data = v));
  }

  edit(e: any) {
    console.log('editing item ' + 'dvbxj');
    console.log({e});
  }

  create() {
    if (this.data != null && this.data["title"] === "User") {
      this.createUser();
    } else if (this.data != null && this.data["title"] === "Slot") {
      this.createSlot();
    }
  }

  createUser(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  createSlot() {
    const dialogRef = this.dialog.open(AddSlotDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }
}
