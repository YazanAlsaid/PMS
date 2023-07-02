import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarComponent} from 'src/app/shared/components/calendar/calendar.component';
import {Slot} from "../../../shared/model/slot";
import {ActivatedRoute} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  private slots: Slot[] = [];
  public pagedSlots: Slot[] = [];
  public myBreakPoint: number = 4;
  private parkId!: number;
  private buildingId!: number;
  private floorId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.parkId = params.parkId;
      this.buildingId = params.buildingId
      this.floorId = params.floorId
    });
  }

  ngOnInit() {
    const resolveData = this.activatedRoute.snapshot.data['slots'];
    if (resolveData.data) {
      this.slots = resolveData.data;
      this.slots.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return (nameA < nameB) ? -1 : 1;
      });
      this.paginator.pageSize = 8;
      this.paginator.pageIndex = 0;
      this.paginator.length = this.slots.length;
      this.paginateSlots();
    } else {
      console.log(resolveData.message);
    }

    this.myBreakPoint = (window.innerWidth <= 600) ? 1 : 4;
    if (window.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (window.innerWidth >= 750 && window.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (window.innerWidth >= 550 && window.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (window.innerWidth <= 550)
      this.myBreakPoint = 1;
  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(() => {
      this.paginateSlots();
    });
  }

  onSelect(slot: Slot) {
    this.dialog.open(CalendarComponent, {
      data: {
        slot: slot,
        buildingId: this.buildingId,
        floorId: this.floorId,
        parkId: this.parkId,
      },
      width: '850px',
      height: '100%',
    });
  }

  handleSize(event: any) {
    if (event.target.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (event.target.innerWidth >= 750 && event.target.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (event.target.innerWidth >= 550 && event.target.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (event.target.innerWidth <= 550)
      this.myBreakPoint = 1;
  }

  private paginateSlots() {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.pagedSlots = this.slots.slice(startIndex, endIndex);
  }
}
