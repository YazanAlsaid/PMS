import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientReservationService} from "../../shared/services/client-reservation.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationResolveService implements Resolve<ResponseMessage>{

  constructor(private reservations: ClientReservationService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.reservations.getReservations()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
