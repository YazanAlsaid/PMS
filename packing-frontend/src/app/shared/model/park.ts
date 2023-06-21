import {Building} from "./building";
import {Timestamp} from "rxjs";

export class Park {
  public id: number;
  public name : string;
  public buildings : Building[];
  public createdAt : Date;
  public updatedAt : Date;


  constructor(id: number, name: string, buildings: Building[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.buildings = buildings;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
