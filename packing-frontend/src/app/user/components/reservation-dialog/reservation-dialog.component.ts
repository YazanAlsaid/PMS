import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss']
})
export class ReservationDialogComponent {
  parkingName!: string;
  building!: string;
  floor!: string;
  slotNumber!: string;
  date!: Date;
  time!: string;

  selectedBuilding!: string;
  selectedFloor!: string;
  selectedSlot!: string;
  morningSelected!: boolean;
  afternoonSelected!: boolean;

  // Define the parking options
  parkingOptions: string[] = ['Parking 1', 'Parking 2', 'Parking 3'];
  buildingOptions: string[] = ['Building 1', 'Building 2', 'Building 3'];
  floorOptions: string[] = ['Floor 1', 'Floor 2', 'Floor 3'];
  slotOptions: string[] = ['Slot 1', 'Slot 2', 'Slot 3'];

  constructor(public dialogRef: MatDialogRef<ReservationDialogComponent>) { }
  saveReservation() {
    const reservation = {
      parkingName: this.parkingName,
      building: this.selectedBuilding,
      floor: this.selectedFloor,
      slotNumber: this.selectedSlot,
      date: this.date.toISOString(),
      time: this.getTimeString()
    };

    // Logic for saving the reservation
    console.log(reservation);

    // Close the dialog
    this.dialogRef.close();
  }

  getTimeString(): string {
    let timeString = '';
    if (this.morningSelected) {
      timeString += 'Morning ';
    }
    if (this.afternoonSelected) {
      timeString += 'Afternoon';
    }
    return timeString.trim();
  }
  onDateInputKeydown(event: KeyboardEvent) {
    const allowedCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/', 'Backspace','ArrowLeft', 'ArrowRight'];

    if (!allowedCharacters.includes(event.key) ) {
      event.preventDefault();
    }
  }

  validateDate() {
    const dateRegex = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;
    // The entered date is not in the "dd/MM/yyyy" format
    // Handle the validation error
    return dateRegex.test(this.date.toString());
  }


}
