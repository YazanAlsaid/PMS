import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientFloorService} from "../../shared/services/client-floor.service";
import {ClientSlotService} from "../../shared/services/client-slot.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SlotsResolveService implements Resolve<ResponseMessage>{

  constructor(private clientSlot : ClientSlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.clientSlot.getSlots()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))  }
}
