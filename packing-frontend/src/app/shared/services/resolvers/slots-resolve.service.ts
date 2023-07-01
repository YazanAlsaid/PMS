import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../model/response-message";
import {ClientFloorService} from "../client-floor.service";

@Injectable({
  providedIn: 'root'
})
export class SlotsResolveService implements Resolve<ResponseMessage>{

  constructor(private clientFloor : ClientFloorService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.clientFloor.getSlots(route.params['floorId'])
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
