import {User} from "./user";

export class Role {
  public id : number;
  public name : string;
  public users : User[];

  constructor(id: number, name: string, users: User[]) {
    this.id = id;
    this.name = name;
    this.users = users;
  }
}
