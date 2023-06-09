import {Park} from "./park";
import {Floor} from "./floor";

export class Building {
  public id : number;
  public name : string;
  public park : Park;
  public floors : Floor[];


  constructor(id: number, name: string, park: Park, floors: Floor[]) {
    this.id = id;
    this.name = name;
    this.park = park;
    this.floors = floors;
  }
}
