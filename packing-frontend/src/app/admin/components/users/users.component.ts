import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/model/user";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ClientUserService} from "../../../shared/services/client-user.service";
import {ActivatedRoute} from "@angular/router";
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public pagedUser: User[] = [];
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
    private activatedRoute: ActivatedRoute,
    private sanckPopup: SnackPopupService) {
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
    this.paginator.page.subscribe(() => {
      this.pagenateUser();
    })
  }



  public pagenateUser() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedUser = this.users.slice(startIndex, endIndex);
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
        console.log(data)
        if (data.user != null) {
          this.clientUser.createUser(data.user).subscribe(
            (res: any) => {
              this.users.push(res.data),
              this.sanckPopup.open(res.message);
            },
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
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
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.updatePagedUsers();
  }

  handleSize($event: any) {

  }
}
