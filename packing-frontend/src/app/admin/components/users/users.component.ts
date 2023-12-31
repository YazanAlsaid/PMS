import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../shared/model/user";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ClientUserService} from "../../../shared/services/client-user.service";
import {ActivatedRoute} from "@angular/router";
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

  private users: User[] = [];
  private fliteredUsers: User[] = [];
  public pagedUsers: User[] = []; // Array to store the users for the current page
  public myBreakPoint: any = 4;

  constructor(
    public dialog: MatDialog,
    private clientUser: ClientUserService,
    private activatedRoute: ActivatedRoute,
    private sanckPopup: SnackPopupService,
    private sanitizer: DomSanitizer,
    private userService: ClientUserService) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      user: null,
      isUpdate: false,
    },
  };
  searchQuery: any;
  downloadJsonHref: any;

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.pagenateUser();
    });
  }

  exportUser() {
    const jsonData = JSON.stringify(this.users, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(jsonData)
    );
  }

  public pagenateUser() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
    this.paginator.length = this.users.length;
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['users'];
    if (resolverData.data) {
      this.users = resolverData.data;
      this.fliteredUsers = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.users.length;
      this.paginateUsers();
    } else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {
    this.dialogConfig.data.user = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(
      AddUserDialogComponent,
      this.dialogConfig
    );
    dialogRef.afterClosed().subscribe((data: any) => {
      this.dialogConfig.data.isUpdate = false;
      if (data.user != null && data.isUpdate) {
        this.userService.updateUser(data.user.id, data.user).subscribe(
          (res: any) => this.users.push(res.data),
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  create(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        console.log(data)
        if (data.user != null) {
          this.clientUser.createUser(data.user).subscribe(
            (res: any) => {
              this.users.push(res.data);
              this.sanckPopup.open(res.message);
              this.pagenateUser();
            },
            (err: any) => console.log(err.error.error)
          );
        }
      });
  }

  show(element: any) {}

  private paginateUsers() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedUsers = this.fliteredUsers.slice(startIndex, endIndex);
  }

  handleSize($event: any) {}

  searchUsers() {
    if (this.searchQuery.trim() !== '') {
      this.fliteredUsers = this.users.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fliteredUsers = this.users;
    }
    this.paginateUsers();
  }
}
