import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup = new FormGroup({});
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]]
    });
  }

  onSubmit(): void {
    if (this.resetForm.invalid) {
      this.errorMessage = 'Please enter a valid email';
      return;
    }

    const email = this.resetForm.value.email;
    this.authService.resetPassword(email).subscribe(
      (res: any) => {
        this.successMessage = 'Password reset request submitted successfully';
        this.errorMessage = '';
        this.resetForm.reset();

        setTimeout(() => {
          this.successMessage = ''; // Clear the success message after 3 seconds
        }, 3000);
      },
      (error) => {
        this.errorMessage = error.error.error;
        this.successMessage = '';
      }
    );
  }
}
