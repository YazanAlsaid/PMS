import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';

export interface Row {
  id: number;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}

const ELEMENT_DATA: Row[] = [
  { id: 1, weight: 1.0079, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, weight: 4.0026, createdAt: new Date(), updatedAt: new Date() },
  { id: 3, weight: 6.941, createdAt: new Date(), updatedAt: new Date() },
  { id: 4, weight: 9.0122, createdAt: new Date(), updatedAt: new Date() },
  { id: 5, weight: 10.811, createdAt: new Date(), updatedAt: new Date() },
  { id: 6, weight: 12.0107, createdAt: new Date(), updatedAt: new Date() },
  { id: 7, weight: 14.0067, createdAt: new Date(), updatedAt: new Date() },
  { id: 8, weight: 15.9994, createdAt: new Date(), updatedAt: new Date() },
  { id: 9, weight: 18.9984, createdAt: new Date(), updatedAt: new Date() },
  { id: 11, weight: 20.1797, createdAt: new Date(), updatedAt: new Date() },
  { id: 12, weight: 20.1797, createdAt: new Date(), updatedAt: new Date() },
  { id: 13, weight: 20.1797, createdAt: new Date(), updatedAt: new Date() },
  { id: 14, weight: 20.1797, createdAt: new Date(), updatedAt: new Date() },
  { id: 15, weight: 20.1797, createdAt: new Date(), updatedAt: new Date() },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  sub: any;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog) { }

  displayedColumns: string[] = ['id', 'name', 'weight', 'createdAt', 'updatedAt', 'action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  data: Data | undefined;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((v) => (this.data = v));
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  edit(e: any) {
    console.log('editing item ' + 'dvbxj');
    console.log({ e });
  }

  deleteItem(e: any) {
    // this.dataSource = this.dataSource.filter((item) => item.id !== e.id);
    console.log('deleting item ' + ' dptoj');
    console.log({ e });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  create() {
    if (this.data != null && this.data["title"] === "User") {
      this.createUeer();
    }
  }

  createUeer(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }
}
