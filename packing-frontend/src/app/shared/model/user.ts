import {Role} from "./role";
import {Reservation} from "./reservation";
import {Nfc} from "./nfc";

export class User {
  public id: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public roles: Role[];
  public reservations: Reservation[];
  public nfc: Nfc;
  public createdAt: Date;
  public updatedAt: Date;


  constructor(id: number, firstName: string, lastName: string, email: string, password: string, roles: Role[], reservations: Reservation[], nfc: Nfc, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.reservations = reservations;
    this.nfc = nfc;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
