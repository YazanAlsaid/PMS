import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientReservationService} from "../../client-reservation.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ReservationsResolveService implements Resolve<ResponseMessage> {

  constructor(private reservations: ClientReservationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.reservations.getReservations()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
