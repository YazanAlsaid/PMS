import { Component } from '@angular/core';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  building: string;
}

@Component({
  selector: 'app-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.scss']
})
export class ParksComponent {

  tiles: Tile[] = [
    {text: 'Park 1', cols: 1, rows: 1, color: '#DDBDF1', building: "Building:4"},
    {text: 'Park 2', cols: 2, rows: 1, color: '#DDBDF1', building: "Building:3"},
    {text: 'Park 3', cols: 3, rows: 1, color: '#DDBDF1', building: "Building:2"},
    {text: 'Park 4', cols: 1, rows: 2, color: '#DDBDF1', building: "Building:5"},
    {text: 'Park 5', cols: 2, rows: 2, color: '#DDBDF1', building: "Building:4"},
    {text: 'Park 6', cols: 3, rows: 2, color: '#DDBDF1', building: "Building:3"},

  ];
}
