import {Floor} from "./floor";
import {Reservation} from "./reservation";
import {Type} from "./type";

export class Slot {
  public id!: number;
  public name: string;
  public floor !: Floor;
  public type!: Type;
  public reservations!: Reservation[];
  public createdAt!: Date;
  public updatedAt!: Date;


  constructor( name: string, floor: Floor , type: Type) {
    this.type=type;
    this.name = name;
    this.floor = floor;
  }
}
