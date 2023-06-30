import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/model/user";
import {Nfc} from "../../../shared/model/nfc";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ClientUserService} from "../../../shared/services/client-user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  // public readonly displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'action'];
  public readonly displayedColumns: string[] = ['id'];
  public dataSource = new MatTableDataSource();
  users: User[] = [];
  pagedUsers: User[] = []; // Array to store the users for the current page
  currentPage = 1; // Current page number
  pageSize = 8; // Number of users per page
  myBreakPoint: any = 4;

  constructor(
    public dialog: MatDialog,
    private clientUser: ClientUserService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clientUser.getUsers().subscribe(
      (res: any) => {
        this.users = res.data;
        this.updatePagedUsers();
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {

  }

  create(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  show(element: any) {

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  updatePagedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.pagedUsers = this.users.slice(startIndex, endIndex);
    console.log(this.pagedUsers);
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePagedUsers();
  }

  handleSize($event: any) {

  }
}
