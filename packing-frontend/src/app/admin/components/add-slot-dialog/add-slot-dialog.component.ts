import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Building} from "../../../shared/model/building";
import {ClientParkService} from "../../../shared/services/client-park.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Park} from "../../../shared/model/park";
import {Type} from "../../../shared/model/type";
import {ClientBuildingService} from "../../../shared/services/client-building.service";
import {ClientTypeService} from "../../../shared/services/client-type.service";
import {Slot} from "../../../shared/model/slot";

@Component({
  selector: 'app-add-slot-dialog',
  templateUrl: './add-slot-dialog.component.html',
  styleUrls: ['./add-slot-dialog.component.scss']
})
export class AddSlotDialogComponent implements OnInit {
  public parkingOptions: Park[] = [];
  public buildingOptions: Building[] = [];
  public floorOptions: Building[] = [];
  public typeOptions: Type[] = [];
  public dialogForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //erste
    public dialogRef: MatDialogRef<AddSlotDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService,
    private clientType: ClientTypeService,
    private clientBuilding: ClientBuildingService) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      type: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => this.parkingOptions = res.data.content,
      (err: any) => console.log(err)
    );
    this.clientType.getTypes().subscribe(
      (res: any) => this.typeOptions = res.data,
      (err: any) => console.log(err)
    );
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
    if (this.dialogForm.get('building')?.valid) {
      const id = this.dialogForm.get('building')?.value.id;
      this.clientBuilding.getFloors(id).subscribe(
        (res: any) => this.floorOptions = res.data,
        (err: any) => console.log(err)
      )
    }
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      const slot = new Slot(this.dialogForm.value.name, this.dialogForm.get('floor')?.value);
      this.data.slot = slot;
      // Schließe den Dialog
      this.dialogRef.close(this.data);
    }
  }
}
