import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ClientNfcService} from "../../../shared/services/client-nfc.service";
import {ActivatedRoute} from "@angular/router";

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

  constructor(private clientNfc: ClientNfcService,
              private activatedRoute: ActivatedRoute) {
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

  }

  show(element: any) {

  }
}
