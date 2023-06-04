import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  constructor(
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalendarComponent>
  ) {}
  dateSelected(date: any) {
    this.dialogRef.close();
    this.router.navigate([`dashboard/slot`], {
      queryParams: {
        slotId: this.data.parking.id,
        date: new Date(date.date).toISOString(),
      },
    });
  }

  events = [
    {
      title: 'Event 1',
      start: new Date(),
      color: {
        primary: '#FAE3E3',
        secondary: 'green',
      },
    },
    {
      title: 'Event 2',
      start: new Date(),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      title: 'Event 3',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
    {
      title: 'Event 4',
      start: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3',
      },
    },
  ];
}
