import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Floor} from "../../../shared/model/floor";
import {User} from "../../../shared/model/user";
import {Nfc} from "../../../shared/model/nfc";
import {da} from "date-fns/locale";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    for (let i = 0; i < 15; i++) {
      this.dataSource.data.push(new User(
        i + 1, `test${i + 1}`, `test${i + 1}`, `test${i + 1}@pms.de`, '',
        [], [], new Nfc(i, "asd-334-2", new Date(), new Date(), [], new Date(), new Date())
        , new Date, new Date))
    }
  }

  edit(element: any) {

  }

  create() {

  }

  show(element:any) {

  }
}
