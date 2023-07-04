import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {MatPaginator} from "@angular/material/paginator";
import {Park} from "../../../shared/model/park";
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {SnackPopupService} from "../../../shared/services/snack-popup.service";

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss'],
})
export class ParksComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  public readonly displayedColumns: string[] = [
    'id',
    'name',
    'createdAt',
    'updatedAt',
    'action',
  ];
  public dataSource: Park[] = [];
  private parks: Park[] = [];
  private fliteredParks: Park[] = [];
  public pagedParks: Park[] = [];

  searchQuery: any;
  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      park: null,
      isUpdate: false,
    },
  };
  public downloadJsonHref: any;

  constructor(
    public dialog: MatDialog,
    private parksService: ClientParkService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sanckPopup: SnackPopupService
  ) {}

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['parks'];
    if (resolverData.data) {
      this.parks = this.dataSource;
      this.fliteredParks = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.parks.length;
      this.paginateParks();
    } else {
      console.log(resolverData.message);
    }
  }

  public paginateParks() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedParks = this.fliteredParks.slice(startIndex, endIndex);
    this.paginator.length = this.fliteredParks.length;
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.paginateParks();
    });
  }

  edit(element: any) {
    this.dialogConfig.data.park = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(
      AddParkDialogComponent,
      this.dialogConfig
    );
    dialogRef.afterClosed().subscribe((data: any) => {
      this.dialogConfig.data.isUpdate = false;
      if (data.park != null && data.isUpdate) {
        this.parksService.updatePark(data.park.id, data.park).subscribe(
          (res: any) => this.parks.push(res.data),
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  create() {
    const dialogRef = this.dialog.open(
      AddParkDialogComponent,
      this.dialogConfig
    );

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data.park != null) {
        this.parksService.createPark(data.park).subscribe(
          (res: any) => {
            this.parks.push(res.data);
            this.paginateParks();
            this.sanckPopup.open(res.message);
          },
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  show(element: any) {}

  exportBuildings() {
    const jsonDate = JSON.stringify(this.pagedParks, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl(
      'data:text/json;charset=UTF-8,' + encodeURIComponent(jsonDate)
    );
  }

  searchParks() {
    if (this.searchQuery.trim() !== '') {
      this.fliteredParks = this.parks.filter((park) =>
        park.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fliteredParks = this.parks;
    }
    this.paginateParks();
  }
}
