import {Timestamp} from "rxjs";
import {User} from "./user";
import {Nfc} from "./nfc";
import {Slot} from "./slot";

export class Reservation {
  public id : number;
  public reservationFrom : Date;
  public reservationTo : Date;
  public user : User;
  public nfc : Nfc;
  public slot : Slot;


  constructor(id: number, reservationFrom: Date, reservationTo: Date, user: User, nfc: Nfc, slot: Slot) {
    this.id = id;
    this.reservationFrom = reservationFrom;
    this.reservationTo = reservationTo;
    this.user = user;
    this.nfc = nfc;
    this.slot = slot;
  }
}
