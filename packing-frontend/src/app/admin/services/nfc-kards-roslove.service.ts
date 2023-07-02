import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ResponseMessage} from "../../shared/model/response-message";
import {Observable, of} from "rxjs";
import {ClientNfcService} from "../../shared/services/client-nfc.service";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NfcKardsRosloveService implements Resolve<ResponseMessage>{

  constructor(private nfcs : ClientNfcService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResponseMessage> | Promise<ResponseMessage> | ResponseMessage {
    return this.nfcs.getNfcs()
      .pipe(
      catchError((err : any) => of(err.error as ResponseMessage )))
  }
}
