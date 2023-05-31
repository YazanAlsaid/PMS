import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Floor} from "../model/floor";

@Injectable({
  providedIn: 'root'
})
export class ClientFloorService {
  constructor(private httpService : HttpService) {}

  public getFloors() : Observable<any[]> {
    return this.httpService.getAll("floors");
  }
  public getFloor(id : number) : Observable<any> {
    return this.httpService.getById("floors",id);
  }
  public createFloor(floor : Floor) : Observable<any> {
    return this.httpService.create('floors',floor);
  }
  public updateFloor(id : number,floor : Floor) : Observable<any> {
    return this.httpService.update("floors",id,floor);

  }
  public deleteFloor(id : number) : Observable<any> {
    return this.httpService.delete("floors", id);
  }
}
