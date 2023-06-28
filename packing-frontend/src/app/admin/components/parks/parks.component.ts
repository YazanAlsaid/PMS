import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ResponseMessage} from "../../../shared/model/response-message";
import {Park} from "../../../shared/model/park";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
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
  public dataSource: MatTableDataSource<Park> = new MatTableDataSource<Park>();

  constructor(
    public dialog: MatDialog,
    private parksService: ClientParkService) {
  }

  ngOnInit(): void {
    this.parksService.getParks().subscribe(
      (res: ResponseMessage) => {
        this.dataSource = new MatTableDataSource<Park>(res.data.content)
        this.dataSource.paginator = this.paginator;
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
    const dialogRef = this.dialog.open(AddParkDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }

  show(element: any) {

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
