import { Injectable } from '@angular/core';
import {ClientUserService} from "../../client-user.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersResolveService implements Resolve<Response>{

  constructor(private users : ClientUserService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.users.getUsers()
      .pipe(
        catchError((err: any) => of(err.error as Response)))
  }
}
