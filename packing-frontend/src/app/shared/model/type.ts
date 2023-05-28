import {Slot} from "./slot";

export class Type {
  public id : number;
  public name : string;
  public slot : Slot;

  constructor(id,name,slot) {
    this.id = id;
    this.name = name;
    this.slot = slot;
  }

}
