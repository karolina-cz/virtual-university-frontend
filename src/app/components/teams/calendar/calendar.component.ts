import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {ViewPeriod} from 'calendar-utils';
import RRule from 'rrule';
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
import {BehaviorSubject, forkJoin, from, Subject, Subscription} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AddTeamDialogComponent} from '../add-team-dialog/add-team-dialog.component';
import {ToastrService} from 'ngx-toastr';
import {EventFormComponent} from './event-form/event-form.component';
import {TeamEventsService} from '../../../core/services/team-events.service';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {Team} from '../../../core/models/team/team.model';
import {map} from 'rxjs/operators';


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

const weekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];

interface MyCalendarEvent extends CalendarEvent {
  owner: string;
  description: string;
  meetingLink: string;
  recurringEventStart;
  recurringEventEnd;
  frequency;
}

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  private currentTeam = new BehaviorSubject<Team>(null);
  @Input() set team(value: Team) {
    if (value.title !== null){
      this.currentTeam.next(value);
    }
  }
  teamId: string;
  submitAddEventClicked = false;
  teamSubscription: Subscription;
  form: FormGroup;
  constructor(private modal: NgbModal, private route: ActivatedRoute, private teamsService: TeamsService,
              private change: ChangeDetectorRef, private formBuilder: FormBuilder, public dialog: MatDialog,
              private toastr: ToastrService, private teamEventsService: TeamEventsService) {
    this.form = this.formBuilder.group({
      members: new FormArray([])
    });
  }

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  @ViewChild('modalDeleteEvent', {static: true}) modalDeleteEvent: TemplateRef<any>;
  locale = 'pl';
  viewPeriod: ViewPeriod;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({event}: { event }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({event}: { event }): void => {
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  events: MyCalendarEvent[] = [];
  membersEvents = {};

  activeDayIsOpen = true;
  faPlus = faPlus;

  ngOnInit(): void {
    flatpickrFactory();
    this.teamId = this.route.snapshot.params.id;
    this.teamSubscription = this.currentTeam.subscribe(x => {
      if (x !== null){
        this.getMembersEvents(this.viewPeriod.start, this.viewPeriod.end).then(() => this.addCheckboxes());
      }
    });
    this.form.valueChanges.subscribe(data => {
      this.onChangeMembersList(data.members);
    });
  }

  ngOnDestroy() {
    this.teamSubscription.unsubscribe();
  }

  private addCheckboxes() {
    this.currentTeamValue.members.forEach(() => this.ordersFormArray.push(new FormControl(false)));
    this.change.markForCheck();
  }

  get currentTeamValue() {
    return this.currentTeam.getValue();
  }

  get ordersFormArray() {
    return this.form.controls.members as FormArray;
  }

  isRecurringEvent(object: any): boolean {
    return 'frequency' in object && object.frequency !== null;
  }

  getAllEvents(fromDate, toDate) {
    const fromDateString = fromDate.toISOString().substring(0, 19);
    const toDateString = toDate.toISOString().substring(0, 19);

    this.teamsService.getTeamEvents(fromDateString, toDateString, this.teamId).subscribe(
      (data) => {
        const events: MyCalendarEvent[] = [];
        for (const teamEvent of data.records) {
          const startDate = new Date(teamEvent.Start_Date__c);
          const endDate = new Date(teamEvent.End_Date__c);
          const color = teamEvent.Team__c === this.teamId ? colors.red : colors.blue;
          const event = {
            start: startDate,
            end: endDate,
            title: teamEvent.Subject__c,
            color,
            id: teamEvent.Id,
            description: teamEvent.Description__c,
            meetingLink: teamEvent.Meeting_Link__c,
            actions: teamEvent.Team__c === this.teamId ? this.actions : null,
            recurringEventStart: null,
            recurringEventEnd: null,
            frequency: null,
            owner: 'team'
          };
          if (teamEvent.Is_Repetitive__c !== true) {
            events.push(event);
          } else {
            event.recurringEventStart = event.start;
            event.recurringEventEnd = event.end;
            event.frequency = teamEvent.Repeat_Frequency__c;
            this.addRecurringEvent(event, events);
          }
        }
        this.events = events;
        this.change.detectChanges();
      }
    );
  }

  getMembersEvents(fromDate, toDate){
    return new Promise(resolve => {
      const fromDateString = fromDate.toISOString().substring(0, 19);
      const toDateString = toDate.toISOString().substring(0, 19);
      forkJoin(this.currentTeamValue.members.map(member => {
        return this.teamEventsService.getUserEvents(fromDateString, toDateString, this.teamId, member.username).pipe(
          map(data => {
            const events: MyCalendarEvent[] = [];
            for (const teamEvent of data.records) {
              const startDate = new Date(teamEvent.Start_Date__c);
              const endDate = new Date(teamEvent.End_Date__c);
              const color = teamEvent.Team__c === this.teamId ? colors.red : colors.blue;
              const event = {
                start: startDate,
                end: endDate,
                title: teamEvent.Subject__c,
                color,
                id: teamEvent.Id,
                description: teamEvent.Description__c,
                meetingLink: teamEvent.Meeting_Link__c,
                actions: teamEvent.Team__c === this.teamId ? this.actions : null,
                recurringEventStart: null,
                recurringEventEnd: null,
                frequency: null,
                owner: 'user'
              };
              if (teamEvent.Is_Repetitive__c === true) {
                event.recurringEventStart = event.start;
                event.recurringEventEnd = event.end;
                event.frequency = teamEvent.Repeat_Frequency__c;
              }
              events.push(event);
              this.membersEvents[member.username] = events;
            }
          })
        );
      })).subscribe(d => {
        resolve();
      });
    });
  }

  onChangeMembersList(members){
    this.events = this.events.filter(e => e.owner !== 'user');
    // tslint:disable-next-line:forin
    let eventsToAdd = [];
    // tslint:disable-next-line:forin
    for (const i in members){
      const username = this.currentTeamValue.members[i].username;
      if (members[i] === true && this.membersEvents[username] !== undefined){
        eventsToAdd = this.mergeWithoutDuplicates(eventsToAdd, this.membersEvents[username]);
      }
    }
    if (eventsToAdd.length !== 0){
      for (const event of eventsToAdd){
        if (event.frequency === null){
          this.events.push(event);
        } else {
          this.addRecurringEvent(event, this.events);
        }
      }
      this.events = [...this.events];
      this.change.markForCheck();
    }
  }

  mergeWithoutDuplicates(initialData, newData){
    const ids = new Set(initialData.map(d => d.id));
    return [...initialData, ...newData.filter(d => !ids.has(d.id))];
  }

  addRecurringEvent(event, events) {
    let rrule = {};
    switch (event.frequency) {
      case 'Daily':
        rrule = {
          freq: RRule.DAILY
        };
        break;
      case 'Weekly':
        rrule = {
          freq: RRule.WEEKLY,
          byweekday: [weekdays[event.recurringEventStart.getDay()]]
        };
        break;
      case 'Monthly':
        rrule = {
          freq: RRule.MONTHLY,
          bymonthday: event.recurringEventStart.getDate()
        };
        break;
    }
    let dtstart;
    if (event.recurringEventStart > this.viewPeriod.start) {
      dtstart = event.recurringEventStart;
    } else {
      dtstart = new Date(this.viewPeriod.start.getTime());
      dtstart.setHours(event.recurringEventStart.getHours());
      dtstart.setMinutes(event.recurringEventStart.getMinutes());
    }
    const until = event.recurringEventEnd < this.viewPeriod.end ? event.recurringEventEnd : this.viewPeriod.end;
    const rule: RRule = new RRule({
      ...rrule,
      dtstart,
      until,
    });

    rule.all().forEach((date) => {
      const endDate = new Date(date.getTime());
      endDate.setHours(event.recurringEventEnd.getHours());
      endDate.setMinutes(event.recurringEventEnd.getMinutes());
      events.push({
        ...event,
        start: date,
        end: endDate
      });
    });
  }

  openDialog(action, event) {
    const isEditingMode = action === 'Edited';
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '600px',
      data: {
        event,
        isEditingMode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== '' && result !== undefined) {
        if (isEditingMode) {
          this.eventEdited(event, result);
        } else {
          this.eventCreated(result);
        }
      }
    });
  }

  eventEdited(eventBeforeEdit, result) {
    const eventChanges = {};
    for (const [key, value] of Object.entries(eventBeforeEdit)) {
      if (result.hasOwnProperty(key) && value !== result[key]) {
        eventChanges[key] = result[key];
      }
    }
    if (Object.keys(eventChanges).length > 0) {
      this.teamEventsService.updateEvent(eventChanges, eventBeforeEdit.id).subscribe(
        (data) => {
          if (data !== 'error') {
            this.getAllEvents(this.viewPeriod.start, this.viewPeriod.end);
          }
        }
      );
    }
  }

  eventCreated(newEvent) {
    this.teamEventsService.createEvent(newEvent, this.teamId).subscribe(
      (data) => {
        if (data !== 'error') {
          const event = {
            start: newEvent.start,
            end: newEvent.end,
            title: newEvent.title,
            color: colors.red,
            id: data.id,
            description: newEvent.description,
            meetingLink: data.meetingLink,
            actions: this.actions,
            recurringEventEnd: null,
            recurringEventStart: null,
            frequency: null,
            owner: 'team'
          };
          if (newEvent.frequency === null){
            this.events.push(event);
          } else {
            event.recurringEventEnd = event.end;
            event.recurringEventStart = event.start;
            event.frequency = newEvent.frequency;
            this.addRecurringEvent(event, this.events);
          }
          this.events = [...this.events];
          this.change.markForCheck();
        }
      }
    );
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
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

  handleEvent(action: string, event: MyCalendarEvent): void {
    if (action === 'Edited') {
      this.openDialog(action, event);
    } else {
      this.modalData = {event};
      if (action === 'Clicked') {
        this.modal.open(this.modalContent, {size: 'lg'});
      } else if (action === 'Deleted') {
        this.modal.open(this.modalDeleteEvent);
      }
    }
  }

  onDeleteEventClicked() {
    this.teamEventsService.deleteEvent(this.modalData.event.id).subscribe(
      (data) => {
      this.events = this.events.filter((event) => event.id !== this.modalData.event.id);
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
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
    ) {
      if (this.currentTeamValue !== null){
        this.getMembersEvents(viewRender.period.start, viewRender.period.end).then(() => {
          this.onChangeMembersList(this.form.value.members);
        });
      }
      this.viewPeriod = viewRender.period;
      this.getAllEvents(viewRender.period.start, viewRender.period.end);
    }
  }
}
