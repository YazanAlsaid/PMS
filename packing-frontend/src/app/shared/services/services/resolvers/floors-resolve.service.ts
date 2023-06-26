import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientBuildingService} from "../../client-building.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientFloorService} from "../../client-floor.service";

@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<Response>{
  constructor(private floors : ClientFloorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.floors.getFloors()
      .pipe(
        catchError((err : any) => of(err.error as Response ))
      )
  }
}
