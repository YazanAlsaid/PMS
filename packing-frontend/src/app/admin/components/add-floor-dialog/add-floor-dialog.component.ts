import {Component, Inject, OnInit} from '@angular/core';
import {Park} from "../../../shared/model/park";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Building} from "../../../shared/model/building";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Floor} from "../../../shared/model/floor";

@Component({
  selector: 'app-add-floor-dialog',
  templateUrl: './add-floor-dialog.component.html',
  styleUrls: ['./add-floor-dialog.component.scss']
})
export class AddFloorDialogComponent implements OnInit {
  public dialogForm!: FormGroup;
  public parkingOptions!: Park[]
  public buildingOptions!: Building[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, //erste
    public dialogRef: MatDialogRef<AddFloorDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      building: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => {
        this.parkingOptions = res.data.content;
      },
      (err: any) => console.log(err)
    )
  }

  onSubmit() {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      console.log(this.dialogForm.get('building')?.value);

      const floor = new Floor(this.dialogForm.value.name,this.dialogForm.get('building')?.value );
      this.data.floor=floor;
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
}
