import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Slot} from "../model/slot";

@Injectable({
  providedIn: 'root'
})
export class ClientSlotService {

  constructor(private httpService : HttpService) {}

  public getSlots() : Observable<any[]> {
    return this.httpService.getAll("slots");
  }
  public getSlot(id : number) : Observable<any> {
    return this.httpService.getById("slots",id);
  }
  public createSlot(slot : Slot) : Observable<any> {
    return this.httpService.create('slots',slot);
  }
  public updateSlot(id : number,slot : Slot) : Observable<any> {
    return this.httpService.update("slots",id,slot);

  }
  public deleteSlot(id : number) : Observable<any> {
    return this.httpService.delete("slots", id);
  }
}
