import { Injectable } from '@angular/core';
import {ClientTypeService} from "../../client-type.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypesResolveService implements Resolve<Response>{

  constructor(private types : ClientTypeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.types.getTypes()
      .pipe(
        catchError((err: any) => of(err.error as Response)))
  }
}
