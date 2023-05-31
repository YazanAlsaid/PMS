import {Component, OnInit} from '@angular/core';

export interface Reservation {
  id: number;
  parkingName: string;
  building: string;
  floor: string;
  slotNumber: string;
  date: string;
  time: string;
  parkingId: number;
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
  styleUrls: ['./slot.component.scss']
})


export class SlotComponent implements OnInit {
  parkings: Parking[] = [];

  ngOnInit() {
    this.generateDummyData(24)
  }

  isReservedMorning(reservation: Reservation): boolean {
    return reservation.time === 'Morning';
  }

  isReservedAfternoon(reservation: Reservation): boolean {
    return (reservation.time === 'Afternoon');
  }

  generateDummyData(count: number) {
    for (let i = 1; i <= count; i++) {
      const reservation = {
        id: i,
        parkingName: `Parking ${i}`,
        building: `Building ${i}`,
        floor: `Floor ${i}`,
        slotNumber: `Slot ${i}`,
        date: "Wed May 30 2023 03:38:35 GMT+0200",
        time: (i % 3 == 0) ? 'Morning' : 'Afternoon',
        parkingId: i
      };
      let parking: Parking = {
        id: i,
        name: `Parkplatz ${i}`,
        type: (i % 4 == 0) ? 'Frauen' : 'normal',
        reservations: []
      }
      parking.reservations.push(reservation);
      this.parkings.push(parking);

    }
    console.log(this.parkings);
  }
}
