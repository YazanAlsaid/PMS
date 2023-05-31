import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "src/app/shared/services/httpServeic";
import {Building} from "../model/building";

@Injectable({
  providedIn: 'root'
})
export class ClientBuildingService {

  constructor(private httpService : HttpService) { }

  public getBuildings(): Observable<any[]>{
    return this.httpService.getAll('buildings');
  }
  public getBuilding(id : number): Observable<any>{
    return this.httpService.getById('buildings',id);
  }
  public createBuilding(building : Building) : Observable<any> {
     return this.httpService.create('buildings',building);
  }
  public updateBuilding(id : number,building : Building) : Observable<any> {
     return this.httpService.update("buildings",id,building);

  }
  public deleteBuilding(id : number) : Observable<any> {
    return this.httpService.delete("buildings",id);
  }
}
