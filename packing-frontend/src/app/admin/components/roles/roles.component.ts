import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientRoleService} from "../../../shared/services/client-role.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddRoleDialoggComponent} from '../add-role-dialog/add-role-dialogg.component';
import {DomSanitizer} from "@angular/platform-browser";
import {Role} from "../../../shared/model/role";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true})
  public paginator!: MatPaginator;
  private roles: Role[] = [];
  public pagedRoles: Role[] = [];
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();
  public downloadJsonHref: any;

  constructor(private clientRoles: ClientRoleService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,
              private sanitizer: DomSanitizer) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      role: null,
      isUpdate: false,
    }
  };
  searchQuery: any;


  exportRole() {
    const jsonData = JSON.stringify(this.dataSource.data, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(jsonData));

  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.paginateRoles();
    });  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['roles'];
    if (resolverData.data) {
      this.roles = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.roles.length;
      this.paginateRoles();

    } else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {

  }

  create() {
    const dialogRef = this.dialog.open(AddRoleDialoggComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.role != null) {
          this.clientRoles.createRole(data.role).subscribe(
            (res: any) => {
              this.roles.push(res.data);
              this.paginateRoles();
            },
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }

  searchRole() {

    if (this.searchQuery.trim() !== '') {
      this.pagedRoles = this.roles.filter(role =>
        role.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.pagedRoles = this.roles;
    }
  }


  private paginateRoles() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedRoles = this.roles.slice(startIndex, endIndex);
  }
}
