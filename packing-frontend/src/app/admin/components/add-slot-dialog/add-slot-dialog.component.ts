import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
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
export class AddSlotDialogComponent implements OnInit{
  public parkingOptions: Park[] = [];
  public buildingOptions: Building[] = [];
  public floorOptions: Building[] = [];
  public typeOptions: Type[] = [];
  public dialogForm!: FormGroup;
  private isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //erste
    public dialogRef: MatDialogRef<AddSlotDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService,
    private clientType: ClientTypeService,
    private clientBuilding: ClientBuildingService
  ) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      floor: ['', Validators.required],
      type: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.isUpdate = this.data.isUpdate;
    if (this.isUpdate) {
      this.setComboBoxValues(this.data.park);
    }
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.clientType.getTypes().subscribe(
      (res: any) => {
        this.typeOptions = res.data;
        if (this.isUpdate) {
          console.log(this.data.slot.type);
          console.log(this.typeOptions);

          this.dialogForm.get('type')?.setValue(this.data.slot.type.name);
          console.log("After",this.dialogForm.get('type')?.value);

        }
      },
      (err: any) => console.log(err)
    );
    this.clientPark.getParks().subscribe(
      (res: any) => {
        this.parkingOptions = res.data.content;
        if (this.isUpdate) {
        //const selectedParkId = this.data.slot.floor.building.park.id;
        //const selectedBuildingId = this.data.slot.floor.building.id;
        //this.dialogForm.get('park')?.setValue(selectedParkId);
        //this.dialogForm.get('building')?.setValue(selectedBuildingId);
        //this.onSelectPark();
        //this.onSelectBuilding();
        }
      },
      (err: any) => console.log(err)
    );

  }

  //ngAfterViewInit(): void {
  //  this.dialogForm.get('type')?.setValue(this.data.slot.type.name);
  //  console.log("After",this.dialogForm.get('type')?.value);
  //}

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

  onSubmit() {
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.slot.name = this.dialogForm.value.name;
      this.data.slot.type = this.dialogForm.value.type;
      this.dialogRef.close(this.data.slot);
    } else if (this.dialogForm.valid) {
      this.data.slot = new Slot(this.dialogForm.value.name, this.dialogForm.value.type);
      this.data.slot.floor = this.dialogForm.value.floor;
      this.dialogRef.close(this.data.slot);
    }
  }

  private setComboBoxValues(slot: Slot) {
    this.dialogForm.get('name')?.setValue(slot.name);
    this.dialogForm.get('park')?.setValue(slot.floor.building.park);
  }

}
