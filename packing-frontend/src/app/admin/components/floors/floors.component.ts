import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Floor} from "../../../shared/model/floor";

@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.dataSource.data.push(new Floor(i+1, "Floor"+(i+1),[], new Date, new Date))
    }
  }

  edit(element:any) {

  }

  create() {

  }
}
