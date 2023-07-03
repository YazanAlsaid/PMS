import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Park } from 'src/app/shared/model/park';
import { Role } from 'src/app/shared/model/role';
import { Type } from 'src/app/shared/model/type';
import { ClientRoleService } from 'src/app/shared/services/client-role.service';
import { ClientTypeService } from 'src/app/shared/services/client-type.service';

@Component({
  selector: 'app-add-role-dialogg',
  templateUrl: './add-role-dialogg.component.html',
  styleUrls: ['./add-role-dialogg.component.scss']
})
export class AddRoleDialoggComponent implements OnInit {
  public dialogForm: FormGroup;
  private isUpdate: boolean = false;

constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<AddRoleDialoggComponent>,
  private formBuilder: FormBuilder,
) {
  this.dialogForm = this.formBuilder.group({
    name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
  });
  this.isUpdate = this.data.isUpdate;
  if (this.isUpdate) {
  }
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



