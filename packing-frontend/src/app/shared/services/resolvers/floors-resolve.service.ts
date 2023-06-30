import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientBuildingService} from "../client-building.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<ResponseMessage>{
  constructor(private clientBuilding : ClientBuildingService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.clientBuilding.getFloors(route.params['buildingId'])
      .pipe(
        catchError((err : any) => of(err.error as ResponseMessage ))
      )
  }
}
