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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //erste
    public dialogRef: MatDialogRef<AddReservationDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService,
    private clientBuilding: ClientBuildingService,
    private clientFloor: ClientFloorService,
    public clientSlot: ClientSlotService) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      slot: ['', Validators.required],
      date: ['', Validators.required],
      period: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      console.log(this.dialogForm.get('slot')?.value);
      // @ts-ignore
      const reservation  = new Reservation(this.dialogForm.value.name, this.dialogForm.get('slot')?.value);
      this.data.reservation = reservation;
      // Schließe den Dialog
      this.dialogRef.close(this.data);
    }
  }

  onSelectPark() {
    if (this.dialogForm.get('park')?.valid) {
      const id = this.dialogForm.get('park')?.value.id;
      this.clientPark.getBuilding(id).subscribe(
        (res: any) => this.buildingOptions = res.data,
        (err: any) => console.log(err)
      )
    }
  }



  onSelectBuilding() {
    console.log(this.dialogForm.get('building')?.value);
    if (this.dialogForm.get('building')?.valid) {
      const id = this.dialogForm.get('building')?.value.id;
      this.clientBuilding.getFloors(id).subscribe(
        (res: any) => this.floorOptions = res.data,
        (err: any) => console.log(err)
      )
    }

  }

  onSelectFloor() {
    console.log(this.dialogForm.get('floor')?.value);
    if (this.dialogForm.get('floor')?.valid) {
      const id = this.dialogForm.get('floor')?.value.id;
      this.clientFloor.getSlots(id).subscribe(
        (res: any) => this.slotOptions = res.data,
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

