import { Nfc } from './nfc';
import { Slot } from './slot';
import { User } from './user';

export class Reservation {
  public id!: number;
  public reservationAt: Date;
  public reservationPeriod!: 'MORNING' | 'AFTERNOON';
  public user!: User;
  public nfc!: Nfc;
  public slot!: Slot;
  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(
    reservationAt: Date,
    user: User,
    slot: Slot,
    period: Reservation['reservationPeriod']
  ) {
    this.reservationAt = reservationAt;
    this.reservationPeriod = period;
    this.user = user;
    this.slot = slot;
  }
}
