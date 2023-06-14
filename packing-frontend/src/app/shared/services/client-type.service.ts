import {Injectable} from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Type} from "../model/type";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientTypeService {

  constructor(private httpService: HttpService) {
  }

  public getTypes(): Observable<ResponseMessage> {
    return this.httpService.getAll("types");
  }

  public getType(id: number): Observable<ResponseMessage> {
    return this.httpService.getById("types", id);
  }

  public createType(type: Type): Observable<ResponseMessage> {
    return this.httpService.create('types', type);
  }

  public updateType(id: number, type: Type): Observable<ResponseMessage> {
    return this.httpService.update("types", id, type);

  }

  public deleteType(id: number): Observable<ResponseMessage> {
    return this.httpService.delete("types", id);
  }
}
