import {Injectable} from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Floor} from "../model/floor";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientFloorService {
  constructor(private httpService : HttpService) {}

  public getFloors() : Observable<ResponseMessage> {
    return this.httpService.getAll("floors");
  }
  public getFloor(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("floors",id);
  }
  public createFloor(floor : Floor) : Observable<ResponseMessage> {
    return this.httpService.create('floors',floor);
  }
  public updateFloor(id : number,floor : Floor) : Observable<ResponseMessage> {
    return this.httpService.update("floors",id,floor);

  }
  public deleteFloor(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("floors", id);
  }

  getSlots(id: any): Observable<any> {
    return this.httpService.getSubList("floors", id, 'slots');
  }
}
