import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddUserDialogComponent} from "../add-user-dialog/add-user-dialog.component";
import {AddBuildingDialogComponent} from "../add-building-dialog/add-building-dialog.component";
import {Building} from "../../../shared/model/building";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource: Building[] = [];
  buildings: Building[] = [];
  searchQuery: string = '';

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      building: null,
      isUpdate: false,
    }
  };
  constructor(
    private dialog: MatDialog,
    private clientBuilding: ClientBuildingService,
    private activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['buildings'];
    if (resolverData.data){
      this.buildings = resolverData.data;
      this.dataSource = this.buildings;
    }else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {
    this.dialogConfig.data.building = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(AddBuildingDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: any) => {
        this.dialogConfig.data.isUpdate = false;
        if (data.building != null && data.isUpdate) {
          this.clientBuilding.updateBuilding(data.building.id, data.building).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          );
        }
      }
    )
  }

  create() {
    const dialogRef = this.dialog.open(AddBuildingDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      if (result && result.building != null){
        this.clientBuilding.createBuilding(result.building).subscribe(
          (res: any) => this.buildings.push(res.data),
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  show(element: any): void {
    // Handle view functionality
  }

  getRandomColor(): string {
    // Generate a random color code
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  exportBuildings() {
    // Add logic to export buildings
    // This function will be called when the "Export Buildings" button is clicked
  }

  addBuilding() {
    // Add logic to add a new building
    // This function will be called when the "Add Building" button is clicked
  }

  searchBuildings() {
    if (this.searchQuery.trim() !== '') {
      this.dataSource = this.buildings.filter(building =>
        building.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.dataSource = this.buildings;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.dataSource = this.buildings;
  }
}
