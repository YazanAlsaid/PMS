import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { StorageService } from '../../Services/storage.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', Validators.required)
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;

      // Check if the token is expired
      if (this.authService.isTokenExpired()) {
        sessionStorage.removeItem('token'); // Delete the token
        this.isLoggedIn = false; // Update login status
        this.roles = []; // Reset roles

        // Store the current URL for redirect after login
        sessionStorage.setItem('redirectUrl', this.router.url);
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (res: any) => {
          console.log(res);
          sessionStorage.setItem('token', res.token);

          // After successful login, retrieve the stored URL and navigate back
          const redirectUrl = sessionStorage.getItem('redirectUrl');
          if (redirectUrl) {
            sessionStorage.removeItem('redirectUrl'); // Clear the stored URL
            this.router.navigateByUrl(redirectUrl);
          } else {
            // No stored URL, navigate to a default page
            this.router.navigate(['/user/dashboard']);
          }
        },
        (err: any) => {
          console.log(err.error);
          if (err.error.status === 401) {
            console.log(err.error.status);
            sessionStorage.removeItem('token');
            this.isLoggedIn = false; // Update login status
            this.roles = []; // Reset roles

            // Display error message
            this.errorMessage = 'Incorrect email or password. Please try again.';
            this.isLoginFailed = true;
          }
        }
      );
    }
  }
}
