import { User } from "./user";

export class Role {
  public id !: number;
  public name: string;
  public users !: User[];
  public createdAt !: Date;
  public updatedAt !: Date;

  constructor(name: string) {
    this.name = name;

  }
}
