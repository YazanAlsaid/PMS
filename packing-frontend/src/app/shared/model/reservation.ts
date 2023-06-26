import {Timestamp} from "rxjs";
import {User} from "./user";
import {Nfc} from "./nfc";
import {Slot} from "./slot";

export class Reservation {
  public id: number;
  public reservationFrom: Date;
  public reservationTo: Date;
  public user !: User;
  public nfc!: Nfc;
  public slot!: Slot;
  public createdAt: Date;
  public updatedAt: Date;


  constructor(id: number, reservationFrom: Date, reservationTo: Date, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.reservationFrom = reservationFrom;
    this.reservationTo = reservationTo;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
