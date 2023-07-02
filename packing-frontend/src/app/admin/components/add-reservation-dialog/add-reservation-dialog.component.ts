import {Component, Inject} from '@angular/core';
import {Park} from "../../../shared/model/park";
import {Floor} from "../../../shared/model/floor";
import {Building} from "../../../shared/model/building";
import {Slot} from "../../../shared/model/slot";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientParkService} from "../../../shared/services/client-park.service";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {ClientFloorService} from "../../../shared/services/client-floor.service";
import {Reservation} from "../../../shared/model/reservation";
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {ClientUserService} from "../../../shared/services/client-user.service";
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-add-reservation-dialog',
  templateUrl: './add-reservation-dialog.component.html',
  styleUrls: ['./add-reservation-dialog.component.scss']
})
export class AddReservationDialogComponent {
  public parkingOptions : Park[] = [];
  public floorOptions : Floor[] = [];
  public buildingOptions : Building[] = [];
  public slotOptions : Slot[] = [];
  public dialogForm !: FormGroup;
  private isUpdate: boolean = false;
  public userOptions : User[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //erste
    public dialogRef: MatDialogRef<AddReservationDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService,
    private clientUser: ClientUserService,
    private clientBuilding: ClientBuildingService,
    private clientFloor: ClientFloorService,
    public clientSlot: ClientSlotService) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      slot: ['', Validators.required],
      date: [['0','1'], Validators.required],
      period: ['', Validators.required],
      user: ['', Validators.required]
    });
    this.isUpdate = this.data.isUpdate;
    if(this.isUpdate){

    }
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => this.parkingOptions = res.data.content,
      (err: any) => console.log(err)
    );
    this.clientUser.getUsers().subscribe(
      (res: any) => this.userOptions = res.data,
      (err: any) => console.log(err)
    );
  }

  onSubmit(): void {
    console.log(this.dialogForm.valid);

    if (this.dialogForm.valid && this.isUpdate) {
      this.data.reservation.date = this.dialogForm.value.date;
      this.data.reservation.period = this.dialogForm.value.period;
      this.data.reservation.user = this.dialogForm.value.user;
      this.data.reservation.slot = this.dialogForm.value.slot;
    } else if (this.dialogForm.valid && !this.isUpdate) {
      this.data.reservation = new Reservation(this.dialogForm.value.date, this.dialogForm.value.period,this.dialogForm.value.user,this.dialogForm.value.slot);
      this.data.reservation.slot = this.dialogForm.value.slot;
      this.data.buildingId = this.dialogForm.value.building.id;
      this.data.floorId = this.dialogForm.value.floor.id;
      this.data.slotId = this.dialogForm.value.slot.id;
      this.dialogRef.close(this.data);
      }
    }

  onSelectPark() {
    if (this.dialogForm.get('park')?.valid) {
      const id = this.dialogForm.get('park')?.value.id;
      this.clientPark.getBuilding(id).subscribe(
        (res: any) => {
          this.buildingOptions = res.data;
          if (this.isUpdate){
          }
        },
        (err: any) => console.log(err)
      )
    }
  }



  onSelectBuilding() {
    console.log(this.dialogForm.get('building')?.value);
    if (this.dialogForm.get('building')?.valid) {
      const id = this.dialogForm.get('building')?.value.id;
      this.clientBuilding.getFloors(id).subscribe(
        (res: any) => {
          this.floorOptions = res.data;
          if (this.isUpdate){

          }
        },
        (err: any) => console.log(err)
      )
    }
  }

  onSelectFloor() {
    console.log(this.dialogForm.get('floor')?.value);
    if (this.dialogForm.get('floor')?.valid) {
      const id = this.dialogForm.get('floor')?.value.id;
      this.clientFloor.getSlots(id).subscribe(
        (res: any) => {
          this.slotOptions = res.data;
          if (this.isUpdate){

          }
        },
        (err: any) => console.log(err)
      )
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onDateInputKeydown($event: KeyboardEvent) {

  }

  validateDate() {

  }
}

