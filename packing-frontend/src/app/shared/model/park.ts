import {Building} from "./building";
import {Timestamp} from "rxjs";

export class Park {
  public id!: number;
  public name: string;
  public buildings!: Building[];
  public createdAt !: Date;
  public updatedAt !: Date;
  public buildingCount!: number;


  constructor(name: string) {
    this.name = name;
  }
}
