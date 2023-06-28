import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-park-dialog',
  templateUrl: './add-park-dialog.component.html',
  styleUrls: ['./add-park-dialog.component.scss']
})
export class AddParkDialogComponent {

  public dialogForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddParkDialogComponent>
  ) {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }


  onSubmit(): void {
    if (this.dialogForm.valid) {
      // Hier kannst du den Code ausführen, um die eingegebenen Daten zu verarbeiten
      console.log(this.dialogForm.value);

      // Schließe den Dialog
      this.dialogRef.close();
    }
  }
}
