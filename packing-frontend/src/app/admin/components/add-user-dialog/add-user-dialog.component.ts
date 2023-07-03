import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from "../../../shared/model/user";
import {Role} from "../../../shared/model/role";
import {Floor} from "../../../shared/model/floor";
import {ClientParkService} from "../../../shared/services/client-park.service";
import {ClientUserService} from "../../../shared/services/client-user.service";
import {ClientRoleService} from "../../../shared/services/client-role.service";
import {ResponseMessage} from "../../../shared/model/response-message";

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent {


  public roleOptions: Role[] = [];

  dialogForm: FormGroup;
  private isUpdate: Boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private clientRole: ClientRoleService
  ) {
    this.dialogForm = this.formBuilder.group({
      firstName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      lastName: ['', Validators.required, Validators.minLength(3), Validators.maxLength(30)],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)],
      confirmPassword: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.clientRole.getRoles().subscribe(
      (res: ResponseMessage) => this.roleOptions = res.data,
      (err: any) => console.log(err)
    )
  }

  onSubmit(): void {
    let roles: Role[] = [];
    if (this.dialogForm.valid && this.isUpdate) {
      this.data.user.name = this.dialogForm.value.name;
      this.dialogRef.close(this.data);
    } else if (this.dialogForm.valid && !this.isUpdate) {
      roles.push(this.dialogForm.value.role);
      this.data.user = new User(
        this.dialogForm.value.firstName,
        this.dialogForm.value.lastName,
        this.dialogForm.value.email,
        this.dialogForm.value.password,
        this.dialogForm.value.confirmPassword,
        roles);
      this.dialogRef.close(this.data);

    }
  }
}
