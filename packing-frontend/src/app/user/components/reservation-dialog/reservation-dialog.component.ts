import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientParkService } from '../../../shared/services/client-park.service';
import { ResponseMessage } from '../../../shared/model/response-message';
import { ClientBuildingService } from '../../../shared/services/client-building.service';
import { ClientFloorService } from '../../../shared/services/client-floor.service';
import { ClientReservationService } from 'src/app/shared/services/client-reservation.service';
import { Reservation } from 'src/app/shared/model/reservation';
import { StorageService } from 'src/app/auth/Services/storage.service';
import { Slot } from 'src/app/shared/model/slot';
import { SnackPopupService } from 'src/app/shared/services/snack-popup.service';

type SelectOption = {
  value: string;
  viewValue: string;
};

export type ReservationDialogComponentData = {
  slotId: string;
  parkingId: string;
  buildingId: string;
  floorId: string;
  date: string;
  reservationPeriod: Reservation['reservationPeriod'];
  slotObj: Slot;
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
  isEnabled: any = false;

  constructor(
    public dialogRef: MatDialogRef<ReservationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReservationDialogComponentData,
    private http: HttpClient,
    private clientPark: ClientParkService,
    private clientBuilding: ClientBuildingService,
    private clientFloor: ClientFloorService,
    private clientReservation: ClientReservationService,
    private storageService: StorageService,
    private sanckPopup: SnackPopupService
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

    this.parkingId = this.data.parkingId;
    this.building = this.data.buildingId;
    this.floor = this.data.floorId;
    this.slotNumber = this.data.slotId;
    this.date = this.data.date;
    this.time = this.data.reservationPeriod;
    if (this.data.date ){
      this.isEnabled = true;
    }
  }

  ngOnInit(): void {
  }

  saveReservation() {
    const reservation: Reservation = new Reservation(
      new Date(this.date),
      this.storageService.getUser(),
      this.data.slotObj,
      this.data.reservationPeriod
    );

    console.log({ reservation });

    this.clientReservation
      .createReservation(
        reservation,
        this.data.buildingId,
        this.data.floorId,
        this.data.slotId
      )
      .subscribe((res) => {
        console.log(res);
        this.sanckPopup.open(res.message);
        this.dialogRef.close();
      });
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
