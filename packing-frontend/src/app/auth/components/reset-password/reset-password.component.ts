import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isResetFailed: boolean = false;
  resetForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.resetForm.invalid) {
      return;
    }

    const email = this.resetForm.value.email;
    this.authService.resetPassword(email).subscribe(
      (res: any) => {
        this.successMessage = 'Password reset request submitted successfully';
        this.errorMessage = '';
        this.resetForm.reset();
        console.log('Password reset request successful');
        console.log(res);
      },
      (error) => {
        this.errorMessage = error.error.error;
        this.successMessage = '';
        console.log('Password reset request failed:', error);
      }
    );
  }
}
