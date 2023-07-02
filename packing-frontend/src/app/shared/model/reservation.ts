import {Timestamp} from "rxjs";
import {User} from "./user";
import {Nfc} from "./nfc";
import {Slot} from "./slot";

export class Reservation {
  public id!: number;
  public reservationAt: Date;
  public reservationPeriod!: 'MORNING' | 'AFTERNOON';
  public user!: User;
  public nfc!: Nfc;
  public slot!: Slot;
  public createdAt!: Date;
  public updatedAt!: Date;


  constructor( reservationAt: Date, period: string, user: User , slot : Slot) {

    this.reservationAt = reservationAt;
    this.reservationPeriod = period;
    this.user = user;
    this.slot=slot;
  }
}
