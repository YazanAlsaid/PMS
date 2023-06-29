import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientRoleService} from "../client-role.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class RolesResolveService implements Resolve<ResponseMessage> {

  constructor(private roles : ClientRoleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.roles.getRoles()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }

}
