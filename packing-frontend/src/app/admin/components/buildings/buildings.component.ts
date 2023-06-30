import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {MatDialog} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {AddBuildingDialogComponent} from "../add-building-dialog/add-building-dialog.component";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(
    private dialog: MatDialog,
    private clientBuilding: ClientBuildingService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clientBuilding.getBuildings().subscribe(
      (res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {

  }

  create() {
    const dialogRef = this.dialog.open(AddBuildingDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  show(element: any) {

  }
}
