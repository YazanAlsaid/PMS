import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

export interface Row {
  id: number;
  weight: number;
}

const ELEMENT_DATA: Row[] = [
  { id: 1, weight: 1.0079 },
  { id: 2, weight: 4.0026 },
  { id: 3, weight: 6.941 },
  { id: 4, weight: 9.0122 },
  { id: 5, weight: 10.811 },
  { id: 6, weight: 12.0107 },
  { id: 7, weight: 14.0067 },
  { id: 8, weight: 15.9994 },
  { id: 9, weight: 18.9984 },
  { id: 10, weight: 20.1797 },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  sub: any;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  displayedColumns: string[] = ['id', 'name', 'weight', 'action'];
  dataSource = ELEMENT_DATA;
  data: Data | undefined;

  ngOnInit() {
    this.sub = this.activatedRoute.data.subscribe((v) => (this.data = v));
  }

  edit(e: any) {
    console.log('editing item ' + 'dvbxj');
    console.log({ e });
  }

  deleteItem(e: any) {
    this.dataSource = this.dataSource.filter((item) => item.id !== e.id);
    console.log('deleting item ' + ' dptoj');
    console.log({ e });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
