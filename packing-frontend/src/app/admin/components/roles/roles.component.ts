import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientRoleService} from "../../../shared/services/client-role.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {MatDialogConfig} from "@angular/material/dialog";

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();
  private dialog: any;

  constructor(private clientRoles: ClientRoleService,
              private activatedRoute: ActivatedRoute) {
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
    /*this.clientRoles.getRoles().subscribe(
      (res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    )*/
    const resolverData = this.activatedRoute.snapshot.data['roles'];
    console.log(resolverData.data);
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
    const dialogRef = this.dialog.open(AddParkDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.role != null) {
          this.clientRoles.createRole(data.role).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }
}
