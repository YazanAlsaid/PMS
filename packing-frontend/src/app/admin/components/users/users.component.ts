import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/model/user";
import {Nfc} from "../../../shared/model/nfc";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ClientUserService} from "../../../shared/services/client-user.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";

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
    private clientUser: ClientUserService,
    private activatedRoute: ActivatedRoute) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      user: null,
      isUpdate: false,
    }
  };

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['users'];
    if (resolverData.data){
      this.users = resolverData.data;
      this.updatePagedUsers();

    }else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {

  }

  create(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.user != null) {
          this.clientUser.createUser(data.user).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
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
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePagedUsers();
  }

  handleSize($event: any) {

  }
}
