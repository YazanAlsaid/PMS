import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Type} from "../model/type";

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  constructor(private httpService : HttpService) {}

  public getType() : Observable<any[]> {
    return this.httpService.getAll("types");
  }
  public getType(id : number) : Observable<any> {
    return this.httpService.getById("types",id);
  }
  public createType(type : Type) : Observable<any> {
    return this.httpService.create('types',type);
  }
  public updateType(id : number,type : Type) : Observable<any> {
    return this.httpService.update("types",id,type);

  }
  public deleteType(id : number) : Observable<any> {
    return this.httpService.delete("types", id);
  }
}
