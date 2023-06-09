import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Nfc} from "../model/nfc";

@Injectable({
  providedIn: 'root'
})
export class ClientNfcService {

  constructor(private httpService : HttpService) {}

  public getNfcs() : Observable<any[]> {
    return this.httpService.getAll("nfcs");
  }
  public getNfc(id : number) : Observable<any> {
    return this.httpService.getById("nfcs",id);
  }
  public createNfc(nfc : Nfc) : Observable<any> {
    return this.httpService.create('nfcs',nfc);
  }
  public updateNfc(id : number,nfc : Nfc) : Observable<any> {
    return this.httpService.update("nfcs",id,nfc);

  }
  public deleteNfc(id : number) : Observable<any> {
    return this.httpService.delete("nfcs", id);
  }
}
