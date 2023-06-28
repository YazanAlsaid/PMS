import {Building} from "./building";
import {Slot} from "./slot";

export class Floor {
  public id: number;
  public name: string;
  public building !: Building;
  public slots: Slot[];
  public createdAt: Date;
  public updatedAt: Date;
  public slotsCount!: number;


  constructor(id: number, name: string, slots: Slot[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.slots = slots;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
