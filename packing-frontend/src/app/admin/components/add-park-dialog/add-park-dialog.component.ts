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
  private isUpdate: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddParkDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.required],
    });

    this.isUpdate = this.data.isUpdate;
    if (this.isUpdate) {
      console.log()
      this.dialogForm.get('name')?.setValue(this.data.park.name);
    }
  }


  onSubmit(): void {
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.park.name = this.dialogForm.value.name;
      // Schließe den Dialog
      this.dialogRef.close(this.data);
    } else if (this.dialogForm.valid && !this.isUpdate ) {
      this.data.park = new Park(this.dialogForm.value.name);
      // Schließe den Dialog
      this.dialogRef.close(this.data);
    }
  }
}
