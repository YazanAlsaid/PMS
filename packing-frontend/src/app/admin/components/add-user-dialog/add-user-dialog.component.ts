import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {Slot} from "../../../shared/model/slot";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {

  dialogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>
  ) {
    this.dialogForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

 /* if (this.dialogForm.valid) {
  // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
  console.log(this.dialogForm.get('floor')?.value);
  const slot = new Slot(this.dialogForm.value.name, this.dialogForm.get('floor')?.value);
  this.data.slot = slot;
  // Schließe den Dialog
  this.dialogRef.close(this.data);
}*/

  onSubmit(): void {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      console.log(this.dialogForm.get('slots')?.value);

      // Schließe den Dialog
      this.dialogRef.close();
    }
  }
}
