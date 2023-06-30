// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Optional,
  TemplateRef,
  Inject,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

export type Reservation = {
  id: number;
  createdAt: string;
  updatedAt: string;
  reservationAt: string;
  reservationPeriod: 'MORNING' | 'AFTERNOON';
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent {
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  constructor(
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalendarComponent>, // private modal: NgbModal
    private modal: NgbModal,
    private http: HttpClient
  ) {}
  dateSelected(date: any) {
    console.log({ date });
    // this.dialogRef.close();
    // this.router.navigate([`dashboard/slots`], {
    //   queryParams: {
    //     slotId: this.data.parking.id,
    //     date: new Date(date.date).toISOString(),
    //   },
    // });
  }
  getEventStart(reservation: Reservation): Date {
    const date = new Date(reservation.reservationAt);
    if (reservation.reservationPeriod === 'MORNING') {
      date.setHours(8);
    } else {
      date.setHours(13);
    }
    return date;
  }
  getEventEnd(reservation: Reservation): Date {
    const date = new Date(reservation.reservationAt);
    if (reservation.reservationPeriod === 'MORNING') {
      date.setHours(13);
    } else {
      date.setHours(18);
    }
    return date;
  }

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  base = 'http://localhost:8080/api/v1/web';
  reservations: { data: Reservation[] } = { data: [] };
  events: CalendarEvent[] = [];

  ngOnInit() {
    this.http
      .get<{ data: Reservation[] }>(`${this.base}/reservations`)
      .subscribe((reservations) => {
        this.reservations = reservations;
        this.events = reservations.data.map((reservation) => ({
          start: this.getEventStart(reservation),
          end: this.getEventEnd(reservation),
          title: reservation.reservationPeriod,
          color:
            reservation.reservationPeriod === 'MORNING'
              ? colors['red']
              : colors['blue'],
          actions: this.actions,
        }));
      });
  }

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
