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

  constructor(id,reservationFrom,reservationTo,user,nfc,slot) {
    this.nfc=nfc;
    this.id=id;
    this.slot=slot;
    this.user=user;
    this.reservationFrom=reservationFrom;
    this.reservationTo=reservationTo;
  }
}
