import {Floor} from "./floor";
import {Reservation} from "./reservation";
import {Type} from "./type";

export class Slot {
  public id: number;
  public name: string;
  public floor !: Floor;
  public type: Type;
  public reservations: Reservation[];
  public createdAt: Date;
  public updatedAt: Date;


  constructor(id: number, name: string, type: Type, reservations: Reservation[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.reservations = reservations;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
