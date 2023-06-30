import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResponseMessage} from "../../../shared/model/response-message";
import {Park} from "../../../shared/model/park";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";

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
    private parksService: ClientParkService) {
  }

  ngOnInit(): void {
    this.parksService.getParks().subscribe(
      (res: ResponseMessage) => {
        this.dataSource = res.data.content;
        this.parks = this.dataSource;
      },
      (err: any) => console.log(err)
    );
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  edit(element: any) {

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
