import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResponseMessage} from "../../../shared/model/response-message";
import {Park} from "../../../shared/model/park";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent implements AfterViewInit, OnInit {
  @ViewChild("paginator") paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource: Park[] = [];
  public parks:Park[] = [];

  searchQuery: any;
  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      park: null,
      isUpdate: false,
    }
  };
  constructor(
    public dialog: MatDialog,
    private parksService: ClientParkService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['parks'];
    if (resolverData.data){
      this.dataSource = resolverData.data.content;
      this.parks = this.dataSource;

    }else {
      console.log(resolverData.message);
    }
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  edit(element: any) {
    this.dialogConfig.data.park = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(AddParkDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.park != null && data.isUpdate) {
          this.parksService.updatePark(data.park.id, data.park).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(AddParkDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.park != null) {
          this.parksService.createPark(data.park).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
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
