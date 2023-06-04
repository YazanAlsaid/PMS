import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  viewDate: Date = new Date();
  constructor(private router: Router) {}
  dateSelected(date: any) {
    console.log(date);

    this.closeModal();

    this.router.navigate([`dashboard/slot`], {
      queryParams: { date: new Date(date.date).toISOString() },
    });
  }
  // emit closeModal
  @Output() closeModalEvent = new EventEmitter();

  closeModal() {
    this.closeModalEvent.emit();
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
