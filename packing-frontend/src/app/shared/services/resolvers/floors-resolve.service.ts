import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientBuildingService} from "../client-building.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientFloorService} from "../client-floor.service";
import {ResponseMessage} from "../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<ResponseMessage>{
  constructor(private floors : ClientFloorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.floors.getFloors()
      .pipe(
        catchError((err : any) => of(err.error as ResponseMessage ))
      )
  }
}
