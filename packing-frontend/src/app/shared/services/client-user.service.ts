import { Injectable } from '@angular/core';
import {HttpService} from "./httpServeic";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {ResponseMessage} from "../model/response-message";

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {

  constructor(private httpService : HttpService) {}

  public getUsers() : Observable<ResponseMessage> {
    return this.httpService.getAll("users");
  }
  public getUser(id : number) : Observable<ResponseMessage> {
    return this.httpService.getById("users",id);
  }
  public createUser(user : User) : Observable<ResponseMessage> {
    return this.httpService.create('users',user);
  }
  public updateUser(id : number,user : User) : Observable<ResponseMessage> {
    return this.httpService.update("users",id,user);

  }
  public deleteUser(id : number) : Observable<ResponseMessage> {
    return this.httpService.delete("users", id);
  }
}
