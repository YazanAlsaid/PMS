import {Building} from "./building";
import {Slot} from "./slot";

export class Floor {
  public id!: number;
  public name: string;
  public building !: Building;
  public slots!: Slot[];
  public createdAt!: Date;
  public updatedAt!: Date;
  public slotsCount!: number;


  constructor(name: string) {
    this.name = name;
  }
}
