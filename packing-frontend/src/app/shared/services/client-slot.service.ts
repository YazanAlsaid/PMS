import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Slot} from "../model/slot";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientSlotService {

  constructor(private httpService : HttpService) {}

  public getSlots() : Observable<ResponseMessage> {
    return this.httpService.getAll("slots");
  }
  public getSlot(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("slots",id);
  }
  public createSlot(slot : Slot) : Observable<ResponseMessage> {
    return this.httpService.create('slots',slot);
  }
  public updateSlot(id : number,slot : Slot) : Observable<ResponseMessage> {
    return this.httpService.update("slots",id,slot);

  }
  public deleteSlot(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("slots", id);
  }
}
