import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientRoleService} from "../../client-role.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RolesResolveService implements Resolve<Response> {

  constructor(private roles : ClientRoleService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.roles.getRoles()
      .pipe(
        catchError((err: any) => of(err.error as Response)))
  }

}
