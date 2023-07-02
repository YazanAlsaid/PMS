import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {AddFloorDialogComponent} from "../add-floor-dialog/add-floor-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Floor} from "../../../shared/model/floor";
import { ResponseMessage } from 'src/app/shared/model/response-message';

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource: Floor[] = [];
  public floors: Floor[] = [];

  searchQuery: any;

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      floor: null,
      isUpdate: false,
    }
  };
  constructor(
    private dialog: MatDialog,
    private clientFloors: ClientFloorService) {
  }

  ngOnInit(): void {
    this.clientFloors.getFloors().subscribe(
      (res: ResponseMessage) => {
        this.dataSource = res.data;
        this.floors = res.data;
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {
    this.dialogConfig.data.floor = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(AddFloorDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: any) => {
        this.dialogConfig.data.isUpdate = false;
        if (data.floor != null && data.isUpdate) {
          this.clientFloors.updateFloor(data.floor.id, data.floor).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(AddFloorDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.floor != null) {
          this.clientFloors.createFloor(data.floor).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }

  show(element: any) {

  }

  exportBuildings() {

  }

  addBuilding() {

  }

  searchBuildings() {

  }

  clearSearch() {

  }
}
