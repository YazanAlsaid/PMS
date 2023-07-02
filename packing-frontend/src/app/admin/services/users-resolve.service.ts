import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientUserService} from "../../shared/services/client-user.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UsersResolveService implements Resolve<ResponseMessage>{

  constructor(private users : ClientUserService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.users.getUsers()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))  }
}
