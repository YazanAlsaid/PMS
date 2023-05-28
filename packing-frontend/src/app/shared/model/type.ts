import {Slot} from "./slot";

export class Type {
  public id : number;
  public name : string;
  public slot : Slot[];

  constructor(id: number, name: string, slot: Slot[]) {
    this.id = id;
    this.name = name;
    this.slot = slot;
  }
}
