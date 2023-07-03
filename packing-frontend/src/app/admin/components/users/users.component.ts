import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../shared/model/user';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ClientUserService } from '../../../shared/services/client-user.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) public paginator!: MatPaginator;

  private users: User[] = [];
  public pagedUsers: User[] = []; // Array to store the users for the current page
  public myBreakPoint: any = 4;

  constructor(
    public dialog: MatDialog,
    private clientUser: ClientUserService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

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
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['users'];
    if (resolverData.data) {
      this.users = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.users.length;
      this.paginateParks();
    } else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {}

  create(): void {
    const dialogRef = this.dialog.open(
      AddUserDialogComponent,
      this.dialogConfig
    );

    dialogRef.afterClosed().subscribe((data: any) => {
      console.log(data);
      if (data.user != null) {
        this.clientUser.createUser(data.user).subscribe(
          (res: any) => this.ngOnInit(),
          (err: any) => console.log(err.error.error)
        );
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      // Handle any actions after the dialog is closed
    });
  }

  show(element: any) {}

  private paginateParks() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedUsers = this.users.slice(startIndex, endIndex);
  }

  handleSize($event: any) {}

  searchUsers() {
    if (this.searchQuery.trim() !== '') {
      this.pagedUsers = this.users.filter(
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
      this.pagedUsers = this.users;
    }
  }
}
