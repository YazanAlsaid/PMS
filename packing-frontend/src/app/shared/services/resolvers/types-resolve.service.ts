import { Injectable } from '@angular/core';
import {ClientTypeService} from "../client-type.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class TypesResolveService implements Resolve<ResponseMessage>{

  constructor(private types : ClientTypeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.types.getTypes()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
