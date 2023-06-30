import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-set-new-password',
  templateUrl: './set-new-password.component.html',
  styleUrls: ['./set-new-password.component.scss']
})
export class SetNewPasswordComponent implements OnInit {
  setPasswordForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.setPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]],
      confirmPassword: ['', Validators.required, Validators.minLength(8), Validators.maxLength(20), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.setPasswordForm.invalid) {
      return;
    }

    const password = this.setPasswordForm.value.password;
    const resetToken = this.route.snapshot.queryParams ['token'];
    const confirmPassword = this.setPasswordForm.value.confirmPassword;

    this.authService.setNewPassword(resetToken, password, confirmPassword).subscribe(
      (res: any) => {
        // Password reset successful, you can redirect to a success page or perform any necessary actions
        console.log('Password reset successful:', res);
        this.router.navigate(['/reset-password-success']);
      },
      (error) => {
        if (error && error.error && error.error.message === 'Invalid token') {
          this.errorMessage = 'Invalid token';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.log('Password reset failed:', error);
      }
    );
  }

}
