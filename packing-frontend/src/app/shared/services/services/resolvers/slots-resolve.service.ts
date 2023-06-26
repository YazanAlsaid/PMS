import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientNfcService} from "../../client-nfc.service";
import {ClientSlotService} from "../../client-slot.service";

@Injectable({
  providedIn: 'root'
})
export class SlotsResolveService implements Resolve<Response>{

  constructor(private slots : ClientSlotService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.slots.getSlots()
      .pipe(
        catchError((err: any) => of(err.error as Response)))
  }
}
