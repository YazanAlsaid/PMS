import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientRoleService} from "../../../shared/services/client-role.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddRoleDialoggComponent } from '../add-role-dialogg/add-role-dialogg.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator,{static: true})
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(private clientRoles: ClientRoleService,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog,) {
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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['roles'];
    if (resolverData.data){
      this.dataSource.data = resolverData.data;
      this.dataSource.paginator = this.paginator;

    }else {
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
            (res: any) => this.dataSource.data.push(res.data),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }
}
