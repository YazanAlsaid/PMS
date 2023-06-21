import {Park} from "./park";
import {Floor} from "./floor";

export class Building {
  public id: number;
  public name: string;
  public park !: Park;
  public floors: Floor[];
  public createdAt: Date;
  public updatedAt: Date;


  constructor(id: number, name: string, floors: Floor[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.floors = floors;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
