import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientNfcService} from "../../../shared/services/client-nfc.service";
import {ActivatedRoute} from "@angular/router";
import {AddParkDialogComponent} from "../add-park-dialog/add-park-dialog.component";
import {MatDialogConfig} from "@angular/material/dialog";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-nfc-cards',
  templateUrl: './nfc-cards.component.html',
  styleUrls: ['./nfc-cards.component.scss']
})
export class NfcCardsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'serialNumber', 'nfcFrom', 'nfcTo', 'user', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();
  private dialog: any;
  public downloadJsonHref: any;

  constructor(private clientNfc: ClientNfcService,
              private activatedRoute: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      roles: null,
      isUpdate: false,
    }
  };

  exportNfcCard() {
    const jsonData = JSON.stringify(this.dataSource.data , null , 2);
    this.downloadJsonHref= this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,'+ encodeURIComponent(jsonData));

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    const resolverData = this.activatedRoute.snapshot.data['nfcCards'];
    console.log(resolverData);
    if (resolverData.data){
      this.dataSource.data = resolverData.data;
      this.dataSource.paginator = this.paginator;

    }else {
      console.log(resolverData.message);
    }
  }

  edit(element: any) {

  }

  create() {
    const dialogRef = this.dialog.open(AddParkDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.roles != null) {
          this.clientNfc.createNfc(data.roles).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );

  }

  show(element: any) {

  }
}
