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
  MatDialogConfig,
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
import { Reservation } from '../../model/reservation';
import { ReservationDialogComponent } from 'src/app/user/components/reservation-dialog/reservation-dialog.component';
import { ClientSlotService } from '../../services/client-slot.service';
import { ResponseMessage } from '../../model/response-message';

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

  private floorId: any;
  private buildingId: any;
  private slotID: number = 0;
  private parkId: string;
  private dialogConfig: MatDialogConfig = {
    width: '400px',
    autoFocus: true,
    data: {
      parkingId: null,
      buildingId: null,
      floorId: null,
      slotId: null,
      date: null,
      reservationPeriod: null,
    },
  };

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<CalendarComponent>,
    private modal: MatDialog,
    private http: HttpClient,
    private clientSlot: ClientSlotService
  ) {
    this.parkId = this.data.parkId;
    this.buildingId = this.data.buildingId;
    this.floorId = this.data.floorId;
    this.slotID = this.data.slot.id;
  }

  ngOnInit() {
    this.clientSlot
      .getReservations(this.slotID, this.buildingId, this.floorId)
      .subscribe(
        (res: ResponseMessage) => {
          this.reservations.data = res.data;
          this.events = this.reservations.data.map(
            (reservation: Reservation) => ({
              ...this.getEventPeriod(reservation),
              title: reservation.reservationPeriod,
              color: colors['blue'],
              actions: this.actions,
              resizable: { beforeStart: true, afterEnd: true },
              draggable: true,
              meta: { reservationPeriod: reservation.reservationPeriod },
            })
          );
        },
        (err: any) => console.log(err)
      );
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
      this.setView(CalendarView.Week);
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
      return iEvent !== event
        ? iEvent
        : { ...event, start: newStart, end: newEnd };
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.dialogConfig.data.parkingId = this.data.parkId;
    this.dialogConfig.data.buildingId = this.data.buildingId;
    this.dialogConfig.data.floorId = this.data.floorId;
    this.dialogConfig.data.slotId = this.data.slot.id;
    this.dialogConfig.data.date = event.start;
    this.dialogConfig.data.reservationPeriod = event.meta.reservationPeriod;
    console.log(this.dialogConfig.data);
    this.modal.open(ReservationDialogComponent, {
      width: '400px',
      autoFocus: true,
      data: {
        parkingId: this.data.parkId,
        buildingId: this.data.buildingId,
        floorId: this.data.floorId,
        slotId: this.data.slot.id,
        date: event.start,
        reservationPeriod: event.meta.reservationPeriod,
        slotObj: this.data.slot,
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
    const date = new Date(event.date);
    const hour = date.getHours();
    if (hour < 8 || hour > 18) {
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
        reservationPeriod: getReservationPeriodFromDate(date),
        slotObj: this.data.slot,
      },
    });
  }
}

function getReservationPeriodFromDate(date: Date): 'MORNING' | 'AFTERNOON' {
  if (date.getHours() < 13) {
    return 'MORNING';
  }
  return 'AFTERNOON';
}
