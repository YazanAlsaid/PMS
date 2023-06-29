import { Injectable } from '@angular/core';
import {ClientUserService} from "../client-user.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class UsersResolveService implements Resolve<ResponseMessage>{

  constructor(private users : ClientUserService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.users.getUsers()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
