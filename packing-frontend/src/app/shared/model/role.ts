import {User} from "./user";

export class Role {
  public id : number;
  public name : string;
  public users : User[];
  public createdAt : Date;
  public updatedAt : Date;

  constructor(id: number, name: string, users: User[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.users = users;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
