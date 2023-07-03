import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddBuildingDialogComponent} from "../add-building-dialog/add-building-dialog.component";
import {Building} from "../../../shared/model/building";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true})
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  private buildings: Building[] = [];
  public pagedBuilding: Building[] = [];
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
  // @ts-ignore
  public downloadJsonHref: SafeUrl;

  constructor(
    private dialog: MatDialog,
    private clientBuilding: ClientBuildingService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sanckPopup: SnackPopupService) {
  }

  ngAfterViewInit(): void {
    this.paginator.page.subscribe(() => {
      this.pagenateBuilding();
    })
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['buildings'];
    if (resolverData.data) {
      this.buildings = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.buildings.length;
      this.pagenateBuilding();

    } else {
      console.log(resolverData.message);
    }
  }

  public pagenateBuilding() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedBuilding = this.buildings.slice(startIndex, endIndex);
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
            (res: any) => this.buildings.push(res.data),
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
      if (result && result.building != null) {
        this.clientBuilding.createBuilding(result.building).subscribe(
          (res: any) => {
            this.buildings.push(res.data),
            this.sanckPopup.open(res.message);
          },
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  show(element: any): void {
    // Handle view functionality
  }

  exportBuildings() {
   const jsonData = JSON.stringify(this.pagedBuilding , null , 2);
   this.downloadJsonHref= this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,'+ encodeURIComponent(jsonData));
  }

  searchBuildings() {
    if (this.searchQuery.trim() !== '') {
      this.pagedBuilding = this.buildings.filter(building =>
        building.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.pagedBuilding = this.buildings;
    }
  }
}
