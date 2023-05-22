import {Component} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  address: string;
}

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})


export class BuildingComponent {

  tiles: Tile[] = [
    {text: 'Building 1', cols: 1, rows: 1, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 2', cols: 2, rows: 1, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 3', cols: 1, rows: 1, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 4', cols: 2, rows: 1, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 5', cols: 1, rows: 2, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 6', cols: 2, rows: 2, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 7', cols: 1, rows: 2, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 8', cols: 2, rows: 2, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 9', cols: 1, rows: 3, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
    {text: 'Building 10', cols: 2, rows: 3, color: '#DDBDF1', address: ",Windeckstraße 33 , 60314 Frankfurt am Main"},
  ];


}
