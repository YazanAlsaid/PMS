import {Component, OnInit} from '@angular/core';
import {ClientParkService} from "../../../shared/services/client-park.service";
import {Park} from "../../../shared/model/park";
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-building-dialog',
  templateUrl: './add-building-dialog.component.html',
  styleUrls: ['./add-building-dialog.component.scss']
})
export class AddBuildingDialogComponent implements OnInit {
  public parkingName!: Park;
  public parkingOptions!: Park[]
  public dialogForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBuildingDialogComponent>,
    private formBuilder: FormBuilder,
    private clientPark: ClientParkService) {
    this.dialogForm = this.formBuilder.group({
      park: ['', Validators.required],
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    });
  }

  ngOnInit(): void {
    this.clientPark.getParks().subscribe(
      (res: any) => {
        this.parkingOptions = res.data.content
      },
      (err: any) => console.log(err)
    )
  }

  onSubmit(): void {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      console.log(this.dialogForm.get('park')?.value);

      // Schließe den Dialog
      this.dialogRef.close();
    }
  }
}
