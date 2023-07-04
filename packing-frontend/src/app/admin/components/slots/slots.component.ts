import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {Slot} from "../../../shared/model/slot";
import {AddSlotDialogComponent} from "../add-slot-dialog/add-slot-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public pagedSlots: Slot[] = [];
  private fliteredSlots: Slot[] = [];
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
  public downloadJsonHref: any;

  constructor(
    public dialog: MatDialog,
    private clientSlots: ClientSlotService,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private sanckPopup: SnackPopupService) {
  }

  ngOnInit(): void {
    const resolveData = this.activatedRoute.snapshot.data['slots'];
    if (resolveData.data){
      this.slots = resolveData.data;
      this.fliteredSlots = resolveData.data;
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.slots.length;
      this.paginateSlots();

    } else {
      console.log(resolveData.message);
    }
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
            (res: any) =>  this.slots.push(res.data),
            (err: any) => console.log(err.error.error)
          );
        }
      }
    );
  }

  create() {
    const dialogRef = this.dialog.open(AddSlotDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // Handle any actions after the dialog is closed
      if (result && result.slot != null){
        this.clientSlots.createSlot(result.slot).subscribe(
          (res: any) => {
            this.slots.push(res.data);
            this.paginateSlots();
            this.sanckPopup.open(res.message);
          },
          (err: any) => console.log(err.error.error)
        );
      }
    });
  }

  show(element: any) {}

  exportSlots() {
    const jsonData = JSON.stringify(this.pagedSlots , null , 2);
    this.downloadJsonHref= this.sanitizer.bypassSecurityTrustUrl('data:text/json;charset=UTF-8,'+ encodeURIComponent(jsonData));

  }

  addBuilding() {}

  searchSlots() {
    if (this.searchQuery.trim() !== '') {
      this.fliteredSlots = this.slots.filter(slot =>
        slot.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.fliteredSlots = this.slots;
    }
    this.paginateSlots();
  }

  paginateSlots() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedSlots = this.fliteredSlots.slice(startIndex, endIndex);
    this.paginator.length = this.fliteredSlots.length
  }
}
