import { Component } from '@angular/core';


export interface Slots {
  color: string;
  cols: number;
  rows: number;
  name_tybe: string;
}
@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.scss']
})


export class SlotComponent {

  slots: Slots[] = [
    {name_tybe: 'Behenderung', cols: 1, rows: 1, color: 'green'},
    {name_tybe: 'Behenderung', cols: 2, rows: 1, color: 'green'},
    {name_tybe: 'Behenderung', cols: 1, rows: 1, color: 'green'},
    {name_tybe: 'Behenderung', cols: 2, rows: 1, color: 'green'},
    {name_tybe: '   Frauen  ', cols: 1, rows: 2, color: 'green'},
    {name_tybe: '   Frauen  ', cols: 2, rows: 2, color: 'red'},
    {name_tybe: '   Frauen  ', cols: 1, rows: 2, color: 'red'},
    {name_tybe: '   slot    ', cols: 2, rows: 2, color: 'red'},
    {name_tybe: '   slot    ', cols: 1, rows: 3, color: 'red'},
    {name_tybe: '   slot    ', cols: 2, rows: 3, color: 'red'},
];
  getGreenCount(): number {
    return this.slots.filter(slot => slot.color === 'green').length;
  }

}
