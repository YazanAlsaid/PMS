import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {ClientNfcService} from "../../../shared/services/client-nfc.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddNfcDialogComponent} from '../add-nfc-dialog/add-nfc-dialog.component';
import {SnackPopupService} from 'src/app/shared/services/snack-popup.service';
import {DomSanitizer} from "@angular/platform-browser";
import {Nfc} from "../../../shared/model/nfc";

@Component({
  selector: 'app-nfc-cards',
  templateUrl: './nfc-cards.component.html',
  styleUrls: ['./nfc-cards.component.scss']
})
export class NfcCardsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: true})
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'serialNumber', 'nfcFrom', 'nfcTo', 'user', 'createdAt', 'updatedAt', 'action'];
  public downloadJsonHref: any;
  private nfcCards: Nfc[] = [];
  private fliteredNfcCards: Nfc[] = [];
  public pagedNfcCards: Nfc[] = [];


  constructor(private clientNfc: ClientNfcService,
              private activatedRoute: ActivatedRoute,
              private dialog: MatDialog,
              private sanitizer: DomSanitizer,
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
  searchQuery: any;

  exportNfcCard() {
    const jsonData = JSON.stringify(this.pagedNfcCards, null, 2);
    this.downloadJsonHref = this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,' + encodeURIComponent(jsonData));
  }

  ngAfterViewInit()
    :
    void {
    this.paginator.page.subscribe(() => {
      this.paginateNfcCards();
    });
  }

  ngOnInit()
    :
    void {
    const resolverData = this.activatedRoute.snapshot.data['nfcCards'];
    console.log(resolverData);
    if (resolverData.data
    ) {
      this.nfcCards = resolverData.data;
      this.fliteredNfcCards = resolverData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.nfcCards.length;
      this.paginateNfcCards();

    } else {
      console.log(resolverData.message);
    }
  }

  paginateNfcCards() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedNfcCards = this.fliteredNfcCards.slice(startIndex, endIndex);
    this.paginator.length = this.fliteredNfcCards.length;
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
              this.nfcCards.unshift(res.data);
              // Sort the data in descending order based on the 'createdAt' property
              this.nfcCards.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt));
              // Reassign the data source to update the table
              this.nfcCards = this.nfcCards.slice();
              // Reset the paginator to the first page
              this.paginator.firstPage();
              this.sanckPopup.open(res.message);
              this.paginateNfcCards();
            },
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }


  show(element: any) {
  }

  searchNfcCard() {
    if (this.searchQuery.trim() !== '') {
      this.fliteredNfcCards = this.nfcCards.filter(nfc =>
        nfc.serialNumber.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        nfc.user.firstName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        nfc.user.lastName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fliteredNfcCards = this.nfcCards;
    }
    this.paginateNfcCards();
  }
}
