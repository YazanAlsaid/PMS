import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewInit, OnInit {

  @Input()
  public columns!: string[];
  @Input()
  public dataSource!:MatTableDataSource<any>;
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  ngOnInit() {
    console.log(this.dataSource.data[0]);
    console.log(this.columns)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    }

  edit(element: any) {

  }

  deleteItem(element: any) {

  }
}
