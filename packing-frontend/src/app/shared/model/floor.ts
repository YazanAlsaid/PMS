import {Building} from "./building";
import {Slot} from "./slot";
import {Park} from "./park";

export class Floor {
  public id!: number;
  public name: string;
  public building !: Building;
  public slots!: Slot[];
  public createdAt!: Date;
  public updatedAt!: Date;
  public slotsCount!: number;


  constructor(name: string , building : Building) {
    this.building=building;
    this.name = name;
  }
}
