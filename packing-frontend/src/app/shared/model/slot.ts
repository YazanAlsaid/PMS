import {Floor} from "./floor";
import {Reservation} from "./reservation";
import {Type} from "./type";

export class Slot {
  public id : number;
  public name : string;
  public floor : Floor;
  public types : Type[];
  public reservations : Reservation[];


  constructor(id: number, name: string, floor: Floor, types: Type[], reservations: Reservation[]) {
    this.id = id;
    this.name = name;
    this.floor = floor;
    this.types = types;
    this.reservations = reservations;
  }
}
