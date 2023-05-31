import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";

import {Role} from "../model/role";

@Injectable({
  providedIn: 'root'
})
export class ClientRoleService {

  constructor(private httpService : HttpService) {}

  public getRoles() : Observable<any[]> {
    return this.httpService.getAll("roles");
  }
  public getRole(id : number) : Observable<any> {
    return this.httpService.getById("roles",id);
  }
  public createRole(role : Role) : Observable<any> {
    return this.httpService.create('roles',role);
  }
  public updateRole(id : number,role : Role) : Observable<any> {
    return this.httpService.update("roles",id,role);

  }
  public deleteRole(id : number) : Observable<any> {
    return this.httpService.delete("roles", id);
  }
}
