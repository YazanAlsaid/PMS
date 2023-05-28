import {Building} from "./building";

export class Park {
  public id: number;
  public name : string;
  public buildings : Building;

  constructor(id,name,buildings){
    this.id = id;
    this.name = name;
    this.buildings = buildings;
  }

}
