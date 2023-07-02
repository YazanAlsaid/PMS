import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../Services/auth.service';
import {StorageService} from '../../Services/storage.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

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
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;

      // Check if the token is expired
      if (this.authService.isTokenExpired()) {
        this.storageService.clearSession(); // Clear the session
        this.isLoggedIn = false; // Update login status
        this.roles = []; // Reset roles

        // Store the current URL for redirect after login
        sessionStorage.setItem('redirectUrl', this.router.url);
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        (res: any) => {
          this.storageService.saveToken(res.token);
          this.storageService.saveUser(res.user);
          // Get the value of the 'redirect' parameter from the query string
          let redirectUrl;
          // Parse the current URL to get the query parameters
          this.activeRoute.queryParams.subscribe(params => redirectUrl = params['returnUrl']);
          if (redirectUrl) {
            // If a redirect URL is specified, clear the stored URL and navigate to it
            this.router.navigateByUrl(redirectUrl).then(() => {
            });
          } else {
            // Otherwise, navigate to a default page
            this.router.navigate(['/user/dashboard']);
          }

        },
        (err: any) => {
          console.log(err.error);
          if (err.status === 401) {
            console.log(err.status);
            this.storageService.clearSession(); // Clear the session
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

  public getMessageError(): void {
    // Handle error message display if needed
  }
}
