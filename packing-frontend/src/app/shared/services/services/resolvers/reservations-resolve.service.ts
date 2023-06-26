import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientReservationService} from "../../client-reservation.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ReservationsResolveService implements Resolve<Response> {

  constructor(private reservations: ClientReservationService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response> {
    return this.reservations.getReservations()
      .pipe(
        catchError((err: any) => of(err.error as Response)))
  }
}
