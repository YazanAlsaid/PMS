import {Component, Inject, OnInit} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Park} from "../../../shared/model/park";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Building} from "../../../shared/model/building";

@Component({
  selector: 'app-add-building-dialog',
  templateUrl: './add-building-dialog.component.html',
  styleUrls: ['./add-building-dialog.component.scss']
})
export class AddBuildingDialogComponent implements OnInit {
  public parkingName!: Park;
  public parkingOptions!: Park[]
  public dialogForm: FormGroup;
  private isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddBuildingDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService
  ) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
    this.isUpdate = this.data.isUpdate;

    if (this.isUpdate) {
      this.dialogForm.get('park')?.disable();
      this.dialogForm.get('name')?.setValue(this.data.building.name);
    }
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => {
        this.parkingOptions = res.data.content;
        if (this.isUpdate) {
          const selectedParkId = this.data.building.park.id;
          this.dialogForm.get('park')?.setValue(selectedParkId);
          this.onSelectPark();
        }
      },
      (err: any) => console.log(err)
    );
  }

  onSubmit(): void {
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.building.name = this.dialogForm.value.name;
      this.dialogRef.close(this.data);
    } else if (this.dialogForm.valid && !this.isUpdate) {
      this.data.building = new Building(this.dialogForm.value.name);
      this.data.building.park = this.dialogForm.value.park;
      this.dialogRef.close(this.data);
    }
  }

  onSelectPark() {
    if (this.dialogForm.get('park')?.value) {
      const id = this.dialogForm.get('park')?.value;
      this.clientPark.getPark(id).subscribe(
        (res: any) => {
          this.parkingOptions = res.data;
          if (this.isUpdate) {
            const selectedBuildingId = this.data.building.id;
            this.dialogForm.get('building')?.setValue(selectedBuildingId);
          }
        },
        (err: any) => console.log(err)
      );
    }
  }
}
