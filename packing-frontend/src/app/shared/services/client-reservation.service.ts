import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Floor} from "../model/floor";
import {Reservation} from "../model/reservation";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientReservationService {

  constructor(private httpService : HttpService) {}

  public getReservations() : Observable<ResponseMessage> {
    return this.httpService.getAll("reservations");
  }
  public getReservation(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("reservations",id);
  }
  public createReservation(reservation : Reservation) : Observable<ResponseMessage> {
    return this.httpService.create('reservations',reservation);
  }
  public updateReservation(id : number,reservation : Reservation) : Observable<ResponseMessage> {
    return this.httpService.update("reservations",id,reservation);

  }
  public deleteReservation(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("reservations", id);
  }
}
