import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { Slot } from "../../../shared/model/slot";
import { AddSlotDialogComponent } from "../add-slot-dialog/add-slot-dialog.component";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ClientSlotService } from "../../../shared/services/client-slot.service";
import { ResponseMessage } from 'src/app/shared/model/response-message';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public pagedSlots: Slot[] = [];
  public slots: Slot[] = [];
  searchQuery: any;

  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    disableClose: true,
    data: {
      slot: null,
      isUpdate: false,
    }
  };

  constructor(
    public dialog: MatDialog,
    private clientSlots: ClientSlotService
  ) {}

  ngOnInit(): void {
    this.clientSlots.getSlots().subscribe(
      (res: ResponseMessage) => {
        this.slots = res.data;
        this.paginator.pageSize = 8;
        this.paginator.pageIndex = 0;
        this.paginator.length = this.slots.length;
        this.paginateSlots();
      },
      (err: any) => console.log(err)
    );
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.paginateSlots();
    });
  }

  edit(element: any) {
    this.dialogConfig.data.slot = element;
    this.dialogConfig.data.isUpdate = true;
    const dialogRef = this.dialog.open(AddSlotDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(
      (data: any) => {
        this.dialogConfig.data.isUpdate = false;
        if (data.slot != null && data.isUpdate) {
          this.clientSlots.updateSlot(data.slot.id, data.slot).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          );
        }
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(AddSlotDialogComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.slot != null) {
          this.clientSlots.createSlot(data.slot).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          );
        }
      }
    );
  }

  show(element: any) {}

  exportBuildings() {}

  addBuilding() {}

  searchBuildings() {}

  clearSearch() {}

  paginateSlots() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedSlots = this.slots.slice(startIndex, endIndex);
  }
}
