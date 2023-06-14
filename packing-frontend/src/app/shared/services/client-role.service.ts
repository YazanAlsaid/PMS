import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";

import {Role} from "../model/role";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientRoleService {

  constructor(private httpService : HttpService) {}

  public getRoles() : Observable<ResponseMessage> {
    return this.httpService.getAll("roles");
  }
  public getRole(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("roles",id);
  }
  public createRole(role : Role) : Observable<ResponseMessage> {
    return this.httpService.create('roles',role);
  }
  public updateRole(id : number,role : Role) : Observable<ResponseMessage> {
    return this.httpService.update("roles",id,role);

  }
  public deleteRole(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("roles", id);
  }
}
