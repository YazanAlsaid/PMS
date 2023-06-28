import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientNfcService} from "../../client-nfc.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {ResponseMessage} from "../../../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class NfcsResolveService implements Resolve<ResponseMessage>{

  constructor(private nfcs : ClientNfcService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage>{
    return this.nfcs.getNfcs()
      .pipe(
        catchError((err : any) => of(err.error as ResponseMessage )))
  }

}
