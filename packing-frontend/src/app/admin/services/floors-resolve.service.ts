import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientBuildingService} from "../../shared/services/client-building.service";
import {ClientFloorService} from "../../shared/services/client-floor.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FloorsResolveService implements Resolve<ResponseMessage>{

  constructor(private clientFloor : ClientFloorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.clientFloor.getFloors()
      .pipe(
        catchError((err : any) => of(err.error as ResponseMessage ))
      )
  }
}
