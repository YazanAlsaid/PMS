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
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { ReservationDialogComponent } from 'src/app/user/components/reservation-dialog/reservation-dialog.component';
import { Reservation } from '../../model/reservation';

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
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
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
  private floorId?: string;
  private buildingId?: string;
  private slotID?: string;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalendarComponent>,
    private modal: MatDialog,
    private http: HttpClient
  ) {
    console.log({ datafromcal: data });
    this.buildingId = this.data.buildingId;
    this.floorId = this.data.floorId;
    this.slotID = this.data.slot.id;
  }

  ngOnInit() {
    this.http
      .get<{ data: Reservation[] }>(
        `${this.baseUrl}/slots/${this.slotID}/reservations?buildingId=${this.buildingId}&floorId=${this.floorId}`
      )
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
          meta: {
            reservationPeriod: reservation.reservationPeriod,
          },
        }));
      });
  }

  dateSelected(date: any) {
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
    start.setHours(8);
    end.setHours(13);
    if (reservation.reservationPeriod === 'AFTERNOON') {
      start.setHours(13);
      end.setHours(18);
    }
    return { start, end };
  }

  dayClicked({
    date: start,
    events,
  }: {
    date: Date;
    events: CalendarEvent[];
  }): void {
    if (!isSameMonth(start, this.viewDate)) {
      return;
    }
    this.viewDate = start;
    if (
      (isSameDay(this.viewDate, start) && this.activeDayIsOpen) ||
      events.length === 0
    ) {
      this.activeDayIsOpen = false;
      return;
    }
    this.activeDayIsOpen = true;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent !== event) {
        return iEvent;
      }
      return { ...event, start: newStart, end: newEnd };
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modal.open(ReservationDialogComponent, {
      width: '400px',
      autoFocus: true,
      data: {
        slotId: this.data.slot.id,
        parkingId: this.data.parkId,
        buildingId: this.data.buildingId,
        floorId: this.data.floorId,
        date: event.start,
        reservationPeriod: event.meta.reservationPeriod,
      },
    });
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
  hourSegmentClicked(event: any) {
    console.log({ hourSegmentClickedEvent: event });
    // if the event.date is not between 8 and 18, return
    if (
      new Date(event.date).getHours() < 8 ||
      new Date(event.date).getHours() >= 18
    ) {
      return;
    }
    this.modal.open(ReservationDialogComponent, {
      width: '400px',
      autoFocus: true,
      data: {
        slotId: this.data.slot.id,
        parkingId: this.data.parkId,
        buildingId: this.data.buildingId,
        floorId: this.data.floorId,
        date: event.date,
        reservationPeriod: event.date.getHours() < 13 ? 'MORNING' : 'AFTERNOON',
      },
    });
  }
}
