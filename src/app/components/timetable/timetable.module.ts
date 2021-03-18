import { NgModule } from '@angular/core';
import {CommonModule, formatDate} from '@angular/common';

import { TimetableRoutingModule } from './timetable-routing.module';
import {TimetableComponent} from './timetable.component';
import {CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CoursesModule} from '../courses/courses.module';
import { CourseComponent } from './course/course.component';

class CustomDateFormatter extends CalendarNativeDateFormatter {
  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new Intl.DateTimeFormat(locale, {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  }
  public weekViewHour({date, locale}: DateFormatterParams): string {
    return formatDate(date, 'HH:mm', locale);
  }
}

@NgModule({
  declarations: [
    TimetableComponent,
    CourseComponent
  ],
  imports: [
    CommonModule,
    TimetableRoutingModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}, {
      dateFormatter: {
        provide: CalendarDateFormatter,
        useClass: CustomDateFormatter
      }
    }),
    CoursesModule
  ]
})
export class TimetableModule { }
