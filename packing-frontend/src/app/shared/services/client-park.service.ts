import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Park} from "../model/park";

@Injectable({
  providedIn: 'root'
})
export class ClientParkService {
  constructor(private httpService : HttpService) {}

  public getPark() : Observable<any[]> {
    return this.httpService.getAll("parks");
  }
  public getPark(id : number) : Observable<any> {
    return this.httpService.getById("parks",id);
  }
  public createPark(park : Park) : Observable<any> {
    return this.httpService.create('parks',park);
  }
  public updatePark(id : number,park : Park) : Observable<any> {
    return this.httpService.update("parks",id,park);

  }
  public deletePark(id : number) : Observable<any> {
    return this.httpService.delete("parks", id);
  }
}
