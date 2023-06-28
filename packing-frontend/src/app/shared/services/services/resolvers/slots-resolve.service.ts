import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientNfcService} from "../../client-nfc.service";
import {ClientSlotService} from "../../client-slot.service";
import {ResponseMessage} from "../../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class SlotsResolveService implements Resolve<ResponseMessage>{

  constructor(private slots : ClientSlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.slots.getSlots()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
