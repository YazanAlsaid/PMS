import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {

  constructor(private httpService : HttpService) {}

  public getUser() : Observable<any[]> {
    return this.httpService.getAll("users");
  }
  public getUser(id : number) : Observable<any> {
    return this.httpService.getById("users",id);
  }
  public createUser(user : User) : Observable<any> {
    return this.httpService.create('users',user);
  }
  public updateUser(id : number,user : User) : Observable<any> {
    return this.httpService.update("users",id,user);

  }
  public deleteUser(id : number) : Observable<any> {
    return this.httpService.delete("users", id);
  }
}
