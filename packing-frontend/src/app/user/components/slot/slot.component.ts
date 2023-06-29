import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarComponent} from 'src/app/shared/components/calendar/calendar.component';
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {Slot} from "../../../shared/model/slot";

export interface Reservation {
  id: number;
  parkingName: string;
  building: string;
  floor: string;
  slotNumber: string;
  date: string;
  time: ReservationTime;
  parkingId: number;
}

enum ReservationTime {
  MORNING = 'Morning',
  AFTERNOON = 'Afternoon',
}

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent implements OnInit {
  public slots: Slot[] = [];
  public myBreakPoint: number = 4;

  constructor(
    public dialog: MatDialog,
    private clientSlots: ClientSlotService
  ) {
  }

  ngOnInit() {
    this.myBreakPoint = (window.innerWidth <= 600) ? 1 : 4;
    if (window.innerWidth > 950)
      this.myBreakPoint = 4;
    else if (window.innerWidth >= 750 && window.innerWidth <= 950)
      this.myBreakPoint = 3;
    else if (window.innerWidth >= 550 && window.innerWidth <= 750)
      this.myBreakPoint = 2;
    else if (window.innerWidth <= 550)
      this.myBreakPoint = 1;

    this.clientSlots.getSlots().subscribe(
      (res: any) => this.slots = res.data,
      (err: any) => console.log(err)
    )
  }

  onSelect(parking: Slot) {
    this.dialog.open(CalendarComponent, {
      data: {
        parking: parking,
      },
      width: '850px',
      height: '100%'
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
}
