import { Injectable } from '@angular/core';
import {ClientParkService} from "../../client-park.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ParksResolveService implements Resolve<ResponseMessage> {

  constructor(private parks: ClientParkService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> {
    return this.parks.getParks()
      .pipe(
        catchError((err: any) => of(err.error as ResponseMessage)))
  }
}
