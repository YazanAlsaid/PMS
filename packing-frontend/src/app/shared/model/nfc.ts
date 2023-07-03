import {Reservation} from "./reservation";
import {User} from "./user";

export class Nfc {
  public id !: number;
  public serialNumber : string;
  public nfcFrom : Date;
  public nfcTo : Date;
  public reservations !: Reservation[];
  public user: User;
  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(serialNumber: string, nfcFrom: Date, nfcTo: Date, user: User) {
    this.serialNumber = serialNumber;
    this.nfcFrom = nfcFrom;
    this.nfcTo = nfcTo;
    this.user = user;
  }
}
