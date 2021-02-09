import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ViewPeriod } from 'calendar-utils';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import {from, Subject} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent,
  CalendarView, CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import {flatpickrFactory} from '../teams.module';
import {ActivatedRoute} from '@angular/router';
import {TeamsService} from '../../../core/services/teams.service';
import {Constants} from '../../../core/constants';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddTeamDialogComponent} from '../add-team-dialog/add-team-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {EventFormComponent} from './event-form/event-form.component';
import {TeamEventsService} from '../../../core/services/team-events.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const colors: any = {
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

interface MyCalendarEvent extends CalendarEvent {
  description: string;
  meetingLink: string;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  teamId: string;
  // addEventForm: FormGroup;
  submitAddEventClicked = false;
  // TODO jezeli edytowany/stworzony event ma wiecej niz dzien, to wtedy automatycznie oznaczany jest allDay
  // TODO po kliknieciu w event powinny byc informacje na jego temat
  // TODO po kliknieciu na delete powinno byc okienko potwierdzenia
  // TODO po kliknieciu olowka powinna byc mozliwosc edycji, anulowania/zapisania zmian
  constructor(private modal: NgbModal, private route: ActivatedRoute, private teamsService: TeamsService,
              private change: ChangeDetectorRef, private formBuilder: FormBuilder, public dialog: MatDialog,
              private toastr: ToastrService, private teamEventsService: TeamEventsService) {
    // this.addEventForm = this.formBuilder.group({
    //   title: ['', [
    //     Validators.required
    //   ]],
    //   description: [''],
    //   startDate: ['', [
    //     Validators.required
    //   ]],
    //   endDate: ['', [
    //     Validators.required
    //   ]]
    // });
  }
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  locale = 'pl';
  viewPeriod: ViewPeriod;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: MyCalendarEvent[] = [];

  activeDayIsOpen = true;
  faPlus = faPlus;

  ngOnInit(): void {
    flatpickrFactory();
    this.teamId = this.route.snapshot.params.id;
  }

  getAllEvents(fromDate, toDate) {
    const fromDateString = fromDate.toISOString().substring(0, 19);
    const toDateString = toDate.toISOString().substring(0, 19);

    this.teamsService.getTeamEvents(fromDateString, toDateString, this.teamId).subscribe(
      (data) => {
        const events: MyCalendarEvent[] = [];
        for (const teamEvent of data.records){
          const startDate = new Date(teamEvent.Start_Date__c);
          const endDate = new Date(teamEvent.End_Date__c);
          const color = teamEvent.Team__c === this.teamId ? colors.red : colors.blue;
          events.push({
            start: startDate,
            end: endDate,
            title: teamEvent.Subject__c,
            color,
            id: teamEvent.Id,
            description: teamEvent.Description__c,
            meetingLink: teamEvent.Meeting_link__c,
            actions: teamEvent.Team__c === this.teamId ? this.actions : null
          });
        }
        this.events = events;
        this.change.detectChanges();
      }
    );
  }

  openDialog(action, event){
    const isEditingMode = action === 'Edited';
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '600px',
      data: {event,
      isEditingMode}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== undefined){
        if (isEditingMode){
          this.eventEdited(event, result);
        } else {
          this.eventCreated(result);
        }
      }
    });
  }

  eventEdited(eventBeforeEdit, result){
    const eventChanges = {};
    for (const [key, value] of Object.entries(eventBeforeEdit)){
      if (result.hasOwnProperty(key) && value !== result[key]){
        eventChanges[key] = result[key];
      }
    }
    if (Object.keys(eventChanges).length > 0){
      this.teamEventsService.updateEvent(eventChanges, eventBeforeEdit.id).subscribe(
        (data) => {
          if (data !== 'error'){
            Object.assign(eventBeforeEdit, eventChanges);
            this.change.markForCheck();
          }
        }
      );
    }
  }

  eventCreated(newEvent){
    this.teamEventsService.createEvent(newEvent, this.teamId).subscribe(
      (data) => {
        if (data !== 'error'){
          this.events.push({
            start: newEvent.start,
            end: newEvent.end,
            title: newEvent.title,
            color: colors.red,
            id: data.id,
            description: newEvent.description,
            meetingLink: data.meetingLink,
            actions: this.actions
          });
          this.events = [...this.events];
          this.change.markForCheck();
        }
      }
    );
  }

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
          description: iEvent.description,
          meetingLink: iEvent.meetingLink
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: MyCalendarEvent): void {
    if (action === 'Edited'){
      this.openDialog(action, event);
    }
    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.openDialog('Clicked', null);
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

  enableAllDates(){
    return true;
  }

  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
      | CalendarWeekViewBeforeRenderEvent
      | CalendarDayViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !(this.viewPeriod?.start.valueOf() === viewRender.period.start.valueOf()) ||
      !(this.viewPeriod?.end.valueOf() === viewRender.period.end.valueOf())
    ){
      this.viewPeriod = viewRender.period;
      this.getAllEvents(viewRender.period.start, viewRender.period.end);
    }
  }
}
