import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CalendarComponent} from 'src/app/shared/components/calendar/calendar.component';
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {Slot} from "../../../shared/model/slot";
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {ActivatedRoute} from "@angular/router";

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
  private parkId!: number;
  private buildingId!: number;
  private floorId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private clientFloors: ClientFloorService
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      this.parkId = params.parkId;
      this.buildingId = params.buildingId
      this.floorId = params.floorId
    });
  }

  ngOnInit() {
    const resolveData = this.activatedRoute.snapshot.data['slots'];
    if (resolveData.data){
      this.slots = resolveData.data;
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
