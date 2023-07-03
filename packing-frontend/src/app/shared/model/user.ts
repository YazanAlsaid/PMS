import {Role} from "./role";
import {Reservation} from "./reservation";
import {Nfc} from "./nfc";

export class User {
  public id!: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public password: string;
  public confirmPassword:string;
  public roles: Role[];
  public reservations!: Reservation[];
  public nfc!: Nfc;
  public createdAt!: Date;
  public updatedAt!: Date;
  public gender: number = 0;


  constructor( firstName: string, lastName: string, email: string, password: string,confirmPassword : string,roles: Role[] ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.confirmPassword = confirmPassword;
  }
}
