import {HttpClient} from '@angular/common/http';
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {ResponseMessage} from "../../../shared/model/response-message";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {ClientFloorService} from "../../../shared/services/client-floor.service";

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
  parkingId!: string;
  building!: string;
  floor!: string;
  slotNumber!: string;
  date!: string;
  time!: string;

  parkingOptions: SelectOption[] = [];
  buildingOptions: SelectOption[] = [];
  floorOptions: SelectOption[] = [];
  slotOptions: SelectOption[] = [];

  baseUrl = 'https://pms.alnaasan.de/api/v1/web';
  period: any;

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private clientPark: ClientParkService,
    private clientBuilding: ClientBuildingService,
    private clientFloor: ClientFloorService
  ) {
    this.clientPark.getParks().subscribe((res: ResponseMessage) => {
      this.parkingOptions = res.data.content.map((parking: any) => {
        return {
          value: parking.id,
          viewValue: parking.name,
        };
      });
    });

    this.clientPark.getBuilding(data.parkingId).subscribe((res: any) => {
      this.buildingOptions = res.data.map((building: any) => {
        return {
          value: building.id,
          viewValue: building.name,
        };
      });
    });

    this.clientBuilding.getFloors(data.buildingId).subscribe((res: any) => {
      this.floorOptions = res.data.map((floor: any) => {
        return {
          value: floor.id,
          viewValue: floor.name,
        };
      });
    });

    this.clientFloor.getSlots(data.floorId).subscribe((res: any) => {
      this.slotOptions = res.data.map((slot: any) => {
        return {
          value: slot.id,
          viewValue: slot.name,
        };
      });
    });

    this.parkingId = data.parkingId;
    this.building = data.buildingId;
    this.floor = data.floorId;
    this.slotNumber = data.slotId;
    this.date = data.date;
    this.time = data.reservationPeriod;
  }

  ngOnInit(): void {
    const readData = setInterval(() =>{
      this.parkingId = this.data.parkingId;
      this.building = this.data.buildingId;
      this.floor = this.data.floorId;
      this.slotNumber = this.data.slotId;
      this.date = this.data.date;

      if (this.parkingOptions.length > 0 && this.buildingOptions.length > 0 && this.floorOptions.length > 0 && this.slotOptions.length > 0) {
        clearInterval(readData);
      }
    }, 1000);

  }

  saveReservation() {
    const reservation = {
      parkingName: this.parkingId,
      building: this.building,
      floor: this.floor,
      slotNumber: this.slotNumber,
      date: this.date,
      time: this.data.reservationPeriod,
    };

    // Logic for saving the reservation

    // Close the dialog
    this.dialogRef.close();
  }

  onDateInputKeydown(event: KeyboardEvent) {
    const allowedCharacters = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '/',
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
    ];

    if (!allowedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  }

  validateDate() {
    const dateRegex =
      /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/((19|20)\d\d)$/;
    // The entered date is not in the "dd/MM/yyyy" format
    // Handle the validation error
    return dateRegex.test(this.date.toString());
  }
}
