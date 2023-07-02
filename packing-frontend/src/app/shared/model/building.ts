import {Park} from "./park";
import {Floor} from "./floor";

export class Building {
  public id!: number;
  public name: string;
  public park !: Park;
  public floors!: Floor[];
  public createdAt!: Date;
  public updatedAt!: Date;
  public address!: any;


  constructor(name: string,park: Park) {
    this.name = name;
    this.park =park;
  }
}
