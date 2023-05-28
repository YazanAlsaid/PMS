import {Building} from "./building";

export class Park {
  public id: number;
  public name : string;
  public buildings : Building[];


  constructor(id: number, name: string, buildings: Building[]) {
    this.id = id;
    this.name = name;
    this.buildings = buildings;
  }
}
