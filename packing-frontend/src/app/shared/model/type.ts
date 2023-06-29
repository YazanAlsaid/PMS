import {Slot} from "./slot";

export class Type {
  public id !: number;
  public name: string;
  public slot: Slot[];

  constructor(name: string, slot: Slot[]) {
    this.name = name;
    this.slot = slot;
  }
}
