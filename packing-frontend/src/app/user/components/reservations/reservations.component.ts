import {Component, OnInit} from '@angular/core';
import {EventColor} from "calendar-utils";
import {Subject} from "rxjs";
import {Reservation} from "../../../shared/model/reservation";
import {CalendarEvent, CalendarEventAction, CalendarView, CalendarEventTimesChangedEvent} from "angular-calendar";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {isSameDay, isSameMonth} from "date-fns";
import {StorageService} from "../../../auth/Services/storage.service";
import {ClientSlotService} from "../../../shared/services/client-slot.service";
import {ReservationDialogComponent} from "../reservation-dialog/reservation-dialog.component";
import {ClientUserService} from "../../../shared/services/client-user.service";

const colors: Record<string, EventColor> = {
  red: {primary: '#ad2121', secondary: '#FAE3E3',},
  blue: {primary: '#1e90ff', secondary: '#D1E8FF',},
  yellow: {primary: '#e3bc08', secondary: '#FDF1BA',},
};

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh = new Subject<void>();
  activeDayIsOpen: boolean = false;
  reservations: { data: Reservation[] } = {data: []};
  events: CalendarEvent[] = [];
  dayStartHour: number = 7;
  dayEndHour: number = 19;
  excludeDays: number[] = [0, 6];
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
  private slotID: number = 0;
  private parkId!: string;
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
    //private dialogRef: MatDialogRef<ReservationsComponent>,
    private modal: MatDialog,
    private http: HttpClient,
    private clientSlot: ClientSlotService,
    private clientUser: ClientUserService,
    private storageService: StorageService
  ) {
  }

  ngOnInit() {
    const user = this.storageService.getUser();
    this.clientUser.getReservations(user.id).subscribe((reservations) => {
      this.reservations = reservations;
      this.events = reservations.data.map((reservation: Reservation) => ({
        ...this.getEventPeriod(reservation),
        title: reservation.reservationPeriod,
        color: colors['blue'],
        actions: this.actions,
        resizable: {beforeStart: true, afterEnd: true},
        draggable: true,
        meta: {reservationPeriod: reservation.reservationPeriod},
      }));
    });
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
    return {start, end};
  }

  dayClicked({date: start, events,}: { date: Date; events: CalendarEvent[]; }): void {
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
        : {...event, start: newStart, end: newEnd};
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.dialogConfig.data.parkingId = this.parkId;
    this.dialogConfig.data.buildingId = this.buildingId;
    this.dialogConfig.data.floorId = this.floorId;
    this.dialogConfig.data.slotId = this.slotID;
    this.dialogConfig.data.date = event.start;
    this.dialogConfig.data.reservationPeriod = event.meta.reservationPeriod;
    let slot;
    if (this.slotID) {
      this.clientSlot.getSlot(this.slotID).subscribe(
        (res: any) => slot = res.data,
        (err: any) => console.log(err)
      );
    }
    this.modal
      .open(ReservationDialogComponent, {
        width: '400px',
        autoFocus: true,
        data: {
          parkingId: this.parkId,
          buildingId: this.buildingId,
          floorId: this.floorId,
          slotId: this.slotID,
          date: event.start,
          reservationPeriod: event.meta.reservationPeriod,
          slotObj: slot,
        },
      })
      .afterClosed()
      .subscribe((resAfterClosed: any) => {
        console.log({resAfterClosed});
        this.refresh.next();
      });
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
    let slot;
    if (this.slotID) {
      this.clientSlot.getSlot(this.slotID).subscribe(
        (res: any) => slot = res.data,
        (err: any) => console.log(err)
      );
    }
    this.modal
      .open(ReservationDialogComponent, {
        width: '400px',
        autoFocus: true,
        data: {
          slotId: this.slotID,
          parkingId: this.parkId,
          buildingId: this.buildingId,
          floorId: this.floorId,
          date: event.date,
          reservationPeriod: getReservationPeriodFromDate(date),
          slotObj: slot,
        },
      })
      .afterClosed()
      .subscribe((resAfterClosed: any) => {
        console.log({resAfterClosed});
        this.refresh.next();
      });
  }
}

function getReservationPeriodFromDate(date: Date): 'MORNING' | 'AFTERNOON' {
  if (date.getHours() < 13) {
    return 'MORNING';
  }
  return 'AFTERNOON';
}
