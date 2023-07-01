import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

type SelectOption = {
  value: string;
  viewValue: string;
};

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.scss'],
})
export class ReservationDialogComponent {
  parkId!: string;
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
  parkingOptions: SelectOption[] = [];
  buildingOptions: SelectOption[] = [];
  floorOptions: SelectOption[] = [];
  slotOptions: SelectOption[] = [];

  baseUrl = 'https://pms.alnaasan.de/api/v1/web';

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    console.log({ data });
    // get the parking options
    this.http.get(`${this.baseUrl}/parks`).subscribe((res: any) => {
      this.parkingOptions = res.data.content.map((parking: any) => {
        console.log({ parking });
        return {
          value: parking.id,
          viewValue: parking.name,
          isDefault: parking.id === data.parkId,
        };
      });
    });
    // this.http
    //   .get(`http://localhost:3000/buildings?parkingId=${data.parkId}`)
    //   .subscribe((res: any) => {
    //     this.buildingOptions = res.map((building: any) => {
    //       return {
    //         value: building.id,
    //         viewValue: building.name,
    //       };
    //     });
    //   });
    // this.http
    //   .get(`http://localhost:3000/floors?buildingId=${data.buildingId}`)
    //   .subscribe((res: any) => {
    //     this.floorOptions = res.map((floor: any) => {
    //       return {
    //         value: floor.id,
    //         viewValue: floor.name,
    //       };
    //     });
    //   });

    // this.http
    //   .get(`http://localhost:3000/slots?floorId=${data.floorId}`)
    //   .subscribe((res: any) => {
    //     this.slotOptions = res.map((slot: any) => {
    //       return {
    //         value: slot.id,
    //         viewValue: slot.name,
    //       };
    //     });
    //   });

    this.parkId = data.parkId;
    this.building = data.buildingId;
    this.floor = data.floorId;
    this.slotNumber = data.slotId;
    this.date = data.date;
    this.time = data.time;
  }
  saveReservation() {
    const reservation = {
      parkingName: this.parkId,
      building: this.selectedBuilding,
      floor: this.selectedFloor,
      slotNumber: this.selectedSlot,
      date: this.date.toISOString(),
      time: this.getTimeString(),
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
