import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientParkService} from "../../shared/services/client-park.service";
import {catchError} from "rxjs/operators";
import {ClientBuildingService} from "../../shared/services/client-building.service";

@Injectable({
  providedIn: 'root'
})
export class BuildingsResolveService implements Resolve<ResponseMessage>{

  constructor(private clientBuilding: ClientBuildingService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.clientBuilding.getBuildings()
      .pipe(
        catchError((err : any) => of(err.error as ResponseMessage )))
  }
}
