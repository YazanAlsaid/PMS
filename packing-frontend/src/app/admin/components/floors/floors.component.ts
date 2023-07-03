import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {AddFloorDialogComponent} from "../add-floor-dialog/add-floor-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Floor} from "../../../shared/model/floor";
import {ActivatedRoute} from "@angular/router";
import {AddBuildingDialogComponent} from "../add-building-dialog/add-building-dialog.component";
import {Building} from "../../../shared/model/building";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
  @ViewChild(MatPaginator ,{static: true})
  public paginator!: MatPaginator;

  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public floors: Floor[] = [];
  public pagedFloor: Floor[] = [];


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
  public downloadJsonHref: any;
  constructor(
    private dialog: MatDialog,
    private clientFloors: ClientFloorService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.pagenateFloor();
    })
  }

  public pagenateFloor() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedFloor = this.floors.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['floors'];
    if (resolverData.data){
      this.pagedFloor = resolverData.data;
      this.floors = resolverData.data
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.floors.length;
      this.pagenateFloor();

    }else {
      console.log(resolverData.message);
    }
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

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      if (result && result.floor != null){
        this.clientFloors.createFloor(result.floor).subscribe(
          (res: any) => this.floors.push(res.data),
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  show(element: any) {

  }

  exportFloors() {
    const jsonData = JSON.stringify(this.pagedFloor , null , 2);
    this.downloadJsonHref= this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,'+ encodeURIComponent(jsonData));

  }

  addBuilding() {

  }

  searchFloors() {
    if (this.searchQuery.trim() !== '') {
      this.pagedFloor = this.floors.filter(floor =>
        floor.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.pagedFloor = this.floors;
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.pagedFloor = this.floors;
  }
}
