import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  free: number;
  frauen: number;
  eAuto: number;
  disability: number;
}
@Component({
  selector: 'app-floors',
  templateUrl: './floors.component.html',
  styleUrls: ['./floors.component.scss']
})
export class FloorsComponent {

  tiles: Tile[] = [
    {text: 'Floor 1', cols: 1, rows: 1, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5},
    {text: 'Floor 2', cols: 2, rows: 1, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 3', cols: 1, rows: 1, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 4', cols: 2, rows: 1, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 5', cols: 1, rows: 2, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 6', cols: 2, rows: 2, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 7', cols: 1, rows: 2, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
    {text: 'Floor 8', cols: 2, rows: 2, color: '#DDBDF1', free: 50, eAuto: 10 ,frauen: 5, disability:5 },
  ];
}
