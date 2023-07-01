import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../model/response-message";
import {Observable, of} from "rxjs";
import {ClientParkService} from "../client-park.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BuildingResolveService implements Resolve<ResponseMessage> {

  constructor(private clientPark: ClientParkService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.clientPark.getBuilding(route.params['parkId'])
      .pipe(
      catchError((err : any) => of(err.error as ResponseMessage )))
  }
}
