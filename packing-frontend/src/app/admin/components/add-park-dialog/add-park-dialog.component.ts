import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Park} from "../../../shared/model/park";

@Component({
  selector: 'app-add-park-dialog',
  templateUrl: './add-park-dialog.component.html',
  styleUrls: ['./add-park-dialog.component.scss']
})
export class AddParkDialogComponent {

  public dialogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddParkDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.dialogForm.valid) {
      this.data.park = new Park(this.dialogForm.value.name);
      // Schließe den Dialog
      this.dialogRef.close(this.data);
    }
  }
}
