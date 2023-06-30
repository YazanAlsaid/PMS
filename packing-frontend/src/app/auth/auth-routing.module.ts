import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAppComponent } from './components/auth-app/auth-app.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SetNewPasswordComponent } from './components/set-new-password/set-new-password.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthAppComponent,
    children: [
      { path: 'login', component: LoginComponent, pathMatch: 'full' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: 'change-password', component: SetNewPasswordComponent },
    ],
    canActivate: [AuthGuard] // Add the AuthGuard to the canActivate array
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}

export const RoutedComponent = [
  AuthAppComponent,
  LoginComponent,
  ResetPasswordComponent,
  SetNewPasswordComponent,
];
