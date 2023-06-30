import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "src/app/shared/services/httpServeic";
import {Building} from "../model/building";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientBuildingService {

  constructor(private httpService: HttpService) {
  }

  public getBuildings(): Observable<ResponseMessage> {
    return this.httpService.getAll('buildings');
  }

  public getBuilding(id: number): Observable<ResponseMessage> {
    return this.httpService.getById('buildings', id);
  }

  public createBuilding(building: Building): Observable<ResponseMessage> {
    return this.httpService.create('buildings', building);
  }

  public updateBuilding(id: number, building: Building): Observable<ResponseMessage> {
    return this.httpService.update("buildings", id, building);

  }

  public deleteBuilding(id: number): Observable<ResponseMessage> {
    return this.httpService.delete("buildings", id);
  }

  public getFloors(id: any): Observable<any> {
    return this.httpService.getSubList("buildings", id,'floors');
  }
}
