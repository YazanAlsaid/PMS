import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientRoleService} from "../../shared/services/client-role.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RolesRosolveService implements Resolve<ResponseMessage>{

  constructor(private roles : ClientRoleService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.roles.getRoles()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
