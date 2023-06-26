import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarComponent } from 'src/app/shared/components/calendar/calendar.component';

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

export interface Parking {
  id: number;
  name: string;
  type: string;
  reservations: Reservation[];
}

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss'],
})
export class SlotComponent implements OnInit {
  parkings: Parking[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.generateDummyData(12);
  }

  isReservedMorning(reservation: Reservation): boolean {
    return reservation.time === ReservationTime.MORNING;
  }

  isReservedAfternoon(reservation: Reservation): boolean {
    return reservation.time === ReservationTime.AFTERNOON;
  }

  generateDummyData(count: number) {
    for (let i = 1; i <= count; i++) {
      const reservation = {
        id: i,
        parkingName: `Parking ${i}`,
        building: `Building ${i}`,
        floor: `Floor ${i}`,
        slotNumber: `Slot ${i}`,
        date: new Date().toDateString(),
        time: i % 3 == 0 ? ReservationTime.MORNING : ReservationTime.AFTERNOON,
        parkingId: i,
      };
      let parking: Parking = {
        id: i,
        name: `Parkplatz ${i}`,
        type: i % 4 == 0 ? 'Frauen' : 'normal',
        reservations: [],
      };
      parking.reservations.push(reservation);
      this.parkings.push(parking);
    }
    console.log(this.parkings);
  }
  onSelect(parking: Parking) {
    this.dialog.open(CalendarComponent, {
      data: {
        parking: parking,
      },
      width: '850px',
      height: '100%'
    });
  }
}
