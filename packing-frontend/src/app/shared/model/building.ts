import {Park} from "./park";
import {Floor} from "./floor";

export class Building {
  public id : number;
  public name : string;
  public park : Park;
  public floors : Floor;

  constructor(id,name,park,floors) {
    this.id = id;
    this.name = name;
    this.park = park;
    this.floors = floors;
  }
}
