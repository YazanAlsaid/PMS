import {Reservation} from "./reservation";
import {User} from "./user";

export class Nfc {
  public id : number;
  public name : string;
  public nfcFrom : Nfc;
  public nfcTo : Nfc;
  public reservations : Reservation;
  public user : User;

  constructor(id: number, name: string, nfcFrom: Nfc, nfcTo: Nfc, reservations: Reservation, user: User) {
    this.id = id;
    this.name = name;
    this.nfcFrom = nfcFrom;
    this.nfcTo = nfcTo;
    this.reservations = reservations;
    this.user = user;
  }
}
