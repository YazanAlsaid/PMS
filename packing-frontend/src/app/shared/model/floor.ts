import {Building} from "./building";
import {Slot} from "./slot";

export class Floor {
  public id : number;
  public name : string;
  public building : Building;
  public slots : Slot[];


  constructor(id: number, name: string, building: Building, slots: Slot[]) {
    this.id = id;
    this.name = name;
    this.building = building;
    this.slots = slots;
  }
}
