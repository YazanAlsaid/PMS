import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ClientParkService} from "../../shared/services/client-park.service";

@Injectable({
  providedIn: 'root'
})
export class ParksResolveService implements Resolve<ResponseMessage>{

  constructor(private parks: ClientParkService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.parks.getParks()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
