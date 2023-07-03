import {Component, Inject, OnInit} from '@angular/core';
import {Park} from "../../../shared/model/park";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Building} from "../../../shared/model/building";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Floor} from "../../../shared/model/floor";
import {ClientBuildingService} from "../../../shared/services/client-building.service";

@Component({
  selector: 'app-add-floor-dialog',
  templateUrl: './add-floor-dialog.component.html',
  styleUrls: ['./add-floor-dialog.component.scss']
})
export class AddFloorDialogComponent implements OnInit {
  public dialogForm!: FormGroup;
  public parkingOptions!: Park[];
  public floorOptions : Floor[] = [];
  public buildingOptions!: Building[];
  private isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddFloorDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService,
    private clientBuilding: ClientBuildingService

  ) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.isUpdate = this.data.isUpdate;
    if (this.isUpdate) {
      this.dialogForm.get('name')?.setValue(this.data.floor.name);
      this.dialogForm.get('park')?.disable();
      this.dialogForm.get('building')?.disable();
    }
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => {
        this.parkingOptions = res.data.content;
        if (this.isUpdate) {
          const selectedParkId = this.data.floor.building.park.id;
          this.dialogForm.get('park')?.setValue(selectedParkId);
          this.onSelectPark();
        }
      },
      (err: any) => console.log(err)
    );
  }

  onSubmit() {
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.floor.name = this.dialogForm.value.name;
      this.dialogRef.close(this.data);
    } else if (this.dialogForm.valid && !this.isUpdate) {
      this.data.floor = new Floor(this.dialogForm.value.name ,this.dialogForm.value.building);
      this.data.floor.building = this.dialogForm.value.building;
      this.dialogRef.close(this.data);

    }
  }

  onSelectPark() {
    if (this.dialogForm.get('park')?.valid) {
      const id = this.dialogForm.get('park')?.value.id;
      this.clientPark.getBuilding(id).subscribe(
        (res: any) => {
          this.buildingOptions = res.data;
          if (this.isUpdate) {
            const selectedBuildingId = this.data.floor.building.id;
            this.dialogForm.get('building')?.setValue(selectedBuildingId);
          }
        },
        (err: any) => console.log(err)
      );
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

}
