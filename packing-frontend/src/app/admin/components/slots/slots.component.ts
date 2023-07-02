import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Slot} from "../../../shared/model/slot";
import {Type} from "../../../shared/model/type";
import {AddSlotDialogComponent} from "../add-slot-dialog/add-slot-dialog.component";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss']
})
export class SlotsComponent implements OnInit {
  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;
  public readonly displayedColumns: string[] = ['id', 'name', 'createdAt', 'updatedAt', 'action'];
  public dataSource: Slot[] = [];
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
    private clientSlots: ClientSlotService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const resolveData = this.activatedRoute.snapshot.data['slots'];
    if (resolveData.data){
      this.dataSource = resolveData.data;
      this.slots = resolveData.data;

    } else {
      console.log(resolveData.message);
    }
  }

  edit(element: any) {

  }

  create() {
    const dialogRef = this.dialog.open(AddSlotDialogComponent,this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      (data: any) => {
        if (data.slot != null) {
          this.clientSlots.createSlot(data.slot).subscribe(
            (res: any) => this.ngOnInit(),
            (err: any) => console.log(err.error.error)
          )
        }
      }
    );
  }


  show(element: any) {

  }

  exportBuildings() {

  }

  addBuilding() {

  }

  searchBuildings() {

  }

  clearSearch() {

  }


}
