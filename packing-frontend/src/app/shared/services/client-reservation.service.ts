import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Floor} from "../model/floor";
import {Reservation} from "../model/reservation";

@Injectable({
  providedIn: 'root'
})
export class ClientReservationService {

  constructor(private httpService : HttpService) {}

  public getReservations() : Observable<any[]> {
    return this.httpService.getAll("reservations");
  }
  public getReservation(id : number) : Observable<any> {
    return this.httpService.getById("reservations",id);
  }
  public createReservation(reservation : Reservation) : Observable<any> {
    return this.httpService.create('reservations',reservation);
  }
  public updateReservation(id : number,reservation : Reservation) : Observable<any> {
    return this.httpService.update("reservations",id,reservation);

  }
  public deleteReservation(id : number) : Observable<any> {
    return this.httpService.delete("reservations", id);
  }
}
