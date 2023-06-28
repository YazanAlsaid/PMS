import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {Nfc} from "../model/nfc";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientNfcService {

  constructor(private httpService : HttpService) {}

  public getNfcs() : Observable<ResponseMessage> {
    return this.httpService.getAll("nfc-cards");
  }
  public getNfc(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("nfcs",id);
  }
  public createNfc(nfc : Nfc) : Observable<ResponseMessage> {
    return this.httpService.create('nfcs',nfc);
  }
  public updateNfc(id : number,nfc : Nfc) : Observable<ResponseMessage> {
    return this.httpService.update("nfcs",id,nfc);

  }
  public deleteNfc(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("nfcs", id);
  }
}
