import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientNfcService} from "../../../shared/services/client-nfc.service";

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

  constructor(private clientNfc: ClientNfcService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clientNfc.getNfcs().subscribe(
      (res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      },
      (err: any) => console.log(err)
    )
  }

  edit(element: any) {

  }

  create() {

  }

  show(element: any) {

  }
}
