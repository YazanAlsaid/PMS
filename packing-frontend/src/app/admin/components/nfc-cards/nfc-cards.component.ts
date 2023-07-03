import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientNfcService} from "../../../shared/services/client-nfc.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddNfcDialogComponent } from '../add-nfc-dialog/add-nfc-dialog.component';
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

@Component({
  selector: 'app-nfc-cards',
  templateUrl: './nfc-cards.component.html',
  styleUrls: ['./nfc-cards.component.scss']
})
export class NfcCardsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'serialNumber', 'nfcFrom', 'nfcTo', 'user', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();


  constructor(private clientNfc: ClientNfcService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private sanckPopup: SnackPopupService) {
  }

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      nfcCard: null,
      isUpdate: false,
    }
  };

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
    const dialogRef = this.dialog.open(AddNfcDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.nfcCard != null) {
          this.clientNfc.createNfc(data.nfcCard).subscribe(
            (res: any) => {
              // Insert the new NFC at the beginning of the data array
              this.dataSource.data.unshift(res.data);
              // Sort the data in descending order based on the 'createdAt' property
              this.dataSource.data.sort((a: any, b:any) => b.createdAt.localeCompare(a.createdAt));
              // Reassign the data source to update the table
              this.dataSource.data = this.dataSource.data.slice();
              // Reset the paginator to the first page
              this.paginator.firstPage();
              this.sanckPopup.open(res.message);
            },
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }



  show(element: any) {

  }
}
