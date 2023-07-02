import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/Services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  constructor(private authService: AuthService, private router: Router) {
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  @Output() sideBarToogle = new EventEmitter();

  @Input() title = '';

  toogleSideBar() {
    this.sideBarToogle.emit();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      // Redirect to login page after logout
      this.router.navigate(['/login']).then(() => {
      });
    });
  }
}
