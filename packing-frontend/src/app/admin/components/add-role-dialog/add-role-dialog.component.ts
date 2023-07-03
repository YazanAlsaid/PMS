import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Role} from 'src/app/shared/model/role';

@Component({
  selector: 'app-add-role-dialog',
  templateUrl: './add-role-dialog.component.html',
  styleUrls: ['./add-role-dialog.component.scss']
})
export class AddRoleDialogComponent implements OnInit {
  public dialogForm: FormGroup;
  private readonly isUpdate: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddRoleDialogComponent>,
    private formBuilder: FormBuilder) {
    this.dialogForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    });
    this.isUpdate = this.data.isUpdate;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.role.name = this.dialogForm.value.name;
      this.dialogRef.close(this.data);
    } else if (this.dialogForm.valid && !this.isUpdate) {
      this.data.role = new Role(this.dialogForm.value.name,);
      this.dialogRef.close(this.data);
    }
  }

}



