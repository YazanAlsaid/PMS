import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {AddFloorDialogComponent} from "../add-floor-dialog/add-floor-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Floor} from "../../../shared/model/floor";

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

  constructor(
    private dialog: MatDialog,
    private clientFloors: ClientFloorService) {
  }

  ngOnInit(): void {
    this.clientFloors.getFloors().subscribe(
      (res: any) => {
        this.dataSource = res.data;
        this.floors = res.data;
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {

  }

  create() {
    const dialogRef = this.dialog.open(AddFloorDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
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
