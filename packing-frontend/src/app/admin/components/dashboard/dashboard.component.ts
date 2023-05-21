import { Component } from '@angular/core';

export interface Row {
  name: string;
  id: number;
  weight: number;
}

const ELEMENT_DATA: Row[] = [
  { id: 1, name: 'Hydrogen', weight: 1.0079 },
  { id: 2, name: 'Helium', weight: 4.0026 },
  { id: 3, name: 'Lithium', weight: 6.941 },
  { id: 4, name: 'Beryllium', weight: 9.0122 },
  { id: 5, name: 'Boron', weight: 10.811 },
  { id: 6, name: 'Carbon', weight: 12.0107 },
  { id: 7, name: 'Nitrogen', weight: 14.0067 },
  { id: 8, name: 'Oxygen', weight: 15.9994 },
  { id: 9, name: 'Fluorine', weight: 18.9984 },
  { id: 10, name: 'Neon', weight: 20.1797 },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'name', 'weight', 'action'];
  dataSource = ELEMENT_DATA;
}
