import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Slot} from "../../../shared/model/slot";
import {Type} from "../../../shared/model/type";
import {AddSlotDialogComponent} from "../add-slot-dialog/add-slot-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ClientSlotService} from "../../../shared/services/client-slot.service";

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private clientSlots: ClientSlotService) {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.clientSlots.getSlots().subscribe(
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
    const dialogRef = this.dialog.open(AddSlotDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      console.log('Dialog closed', result);
    });
  }


  show(element: any) {

  }
}
