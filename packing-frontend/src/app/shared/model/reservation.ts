import {Timestamp} from "rxjs";
import {User} from "./user";
import {Nfc} from "./nfc";
import {Slot} from "./slot";

export class Reservation {
  public id: number;
  public reservationAt: Date;
  public period!: string;
  public user !: User;
  public nfc!: Nfc;
  public slot!: Slot;
  public createdAt: Date;
  public updatedAt: Date;


  constructor(id: number, reservationAt: Date, period: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.reservationAt = reservationAt;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
