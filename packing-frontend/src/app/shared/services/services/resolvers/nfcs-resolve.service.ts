import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {ClientNfcService} from "../../client-nfc.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NfcsResolveService implements Resolve<Response>{

  constructor(private nfcs : ClientNfcService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Response>{
    return this.nfcs.getNfcs()
      .pipe(
        catchError((err : any) => of(err.error as Response )))
  }

}
