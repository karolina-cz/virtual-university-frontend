import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  CalendarDayViewBeforeRenderEvent,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent, CalendarMonthViewBeforeRenderEvent,
  CalendarView, CalendarWeekViewBeforeRenderEvent,
} from 'angular-calendar';
import {Subject} from 'rxjs';
import {ViewPeriod} from 'calendar-utils';
import {TimetableService} from '../../core/services/timetable/timetable.service';
import RRule from 'rrule';
import {Router} from '@angular/router';

interface MyCalendarEvent extends CalendarEvent {
  description: string;
  meetingLink: string;
  recurringEventStart;
  recurringEventEnd;
  frequency;
  groupId;
}
const weekdays = [RRule.SU, RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR, RRule.SA];
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
  orange: {
    primary: '#de8914',
    secondary: '#fde1ba'
  }
};

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.css']
})


export class TimetableComponent implements OnInit {
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  events: MyCalendarEvent[] = [];
  refresh: Subject<any> = new Subject();
  viewPeriod: ViewPeriod;

  constructor(private timetableService: TimetableService, private change: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.timetableService.getTimetable().subscribe(data => {
      if (data !== 'error'){
        this.createEvents(data);
      }
    });
  }

  createEvents(data){
    const events: MyCalendarEvent[] = [];
    for (const teamEvent of data.records) {
      const startDate = new Date(teamEvent.Start_Date__c);
      const endDate = new Date(teamEvent.End_Date__c);
      const color = colors.orange;
      const event = {
        start: startDate,
        end: endDate,
        title: teamEvent.Subject__c,
        color,
        id: teamEvent.Id,
        description: teamEvent.Description__c,
        meetingLink: teamEvent.Meeting_Link__c,
        actions: null,
        recurringEventStart: startDate,
        recurringEventEnd: endDate,
        frequency: 'Weekly',
        groupId: teamEvent.Didactic_Group__c
      };
      this.addRecurringEvent(event, events);
    }
    this.events = events;
    this.change.detectChanges();
  }

  addRecurringEvent(event, events) {
    const rrule = {
      freq: RRule.WEEKLY,
      byweekday: [weekdays[event.recurringEventStart.getDay()]]
    };
    const dtstart = new Date(this.viewPeriod.start.getTime());
    dtstart.setHours(event.recurringEventStart.getHours());
    dtstart.setMinutes(event.recurringEventStart.getMinutes());
    const until = this.viewPeriod.end;
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

  handleEvent(action: string, event: MyCalendarEvent): void {
    this.router.navigate(['timetable/course/' + event.groupId + '/grades']);
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
      this.viewPeriod = viewRender.period;
    }
  }

}
