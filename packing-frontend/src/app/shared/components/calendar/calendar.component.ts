// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  Inject,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { endOfDay, isSameDay, isSameMonth, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { Reservation } from '../../model/reservation';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';

const colors: Record<string, EventColor> = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  @ViewChild('modalContent', {static: true}) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = true;
  baseUrl = 'https://pms.alnaasan.de/api/v1/web';
  reservations: { data: Reservation[] } = { data: [] };
  events: CalendarEvent[] = [];
  modalData!: {
    action: string;
    event: CalendarEvent;
  };
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];
  private floorId: any;
  private buildingId: any;
  private slotID: string = '';

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalendarComponent>, // private modal: NgbModal
    private modal: MatDialog,
    private http: HttpClient
  ) {
    this.buildingId = this.data.buildingId;
    this.floorId = this.data.floorId;
    this.slotID = this.data.slot.id;
  }

  ngOnInit() {
    this.http.get<{ data: Reservation[] }>(`${this.baseUrl}/slots/${this.slotID}/reservations?buildingId=${this.buildingId}&floorId=${this.floorId}`)
      .subscribe((reservations) => {
        this.reservations = reservations;
        this.events = reservations.data.map((reservation) => ({
          ...this.getEventPeriod(reservation),
          title: reservation.reservationPeriod,
          color: colors['blue'],
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
          draggable: true,
        }));
      });
  }

  dateSelected(date: any) {
    console.log({date});
    // this.dialogRef.close();
    // this.router.navigate([`dashboard/slots`], {
    //   queryParams: {
    //     slotId: this.data.parking.id,
    //     date: new Date(date.date).toISOString(),
    //   },
    // });
  }

  getEventPeriod(reservation: Reservation): { start: Date; end: Date } {
    const start = new Date(reservation.reservationAt);
    const end = new Date(reservation.reservationAt);
    start.setHours(13);
    end.setHours(18);
    if (reservation.reservationPeriod === 'MORNING') {
      start.setHours(8);
      end.setHours(13);
    }
    return {start, end};
  }

  dayClicked({date: start, events,}: { date: Date; events: CalendarEvent[]; }): void {
    if (!isSameMonth(start, this.viewDate)) {
      return;
    }
    this.viewDate = start;
    if ((isSameDay(this.viewDate, start) && this.activeDayIsOpen) || events.length === 0) {
      this.activeDayIsOpen = false;
    }
    this.activeDayIsOpen = true;
  }

  eventTimesChanged({event, newStart, newEnd,}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent !== event) {
        return iEvent;
      }
      return {...event, start: newStart, end: newEnd,};
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modal.open(AddReservationComponent, {});
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors['red'],
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

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
