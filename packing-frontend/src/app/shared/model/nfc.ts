import {Reservation} from "./reservation";
import {User} from "./user";

export class Nfc {
  public id: number;
  public name: string;
  public nfcFrom: Date;
  public nfcTo: Date;
  public reservations: Reservation[];
  public user!: User;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(id: number, name: string, nfcFrom: Date, nfcTo: Date, reservations: Reservation[], createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.nfcFrom = nfcFrom;
    this.nfcTo = nfcTo;
    this.reservations = reservations;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
