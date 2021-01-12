import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import {TeamsComponent} from './teams.component';
import {TeamComponent} from './team/team.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMembersComponent } from './team/team-members/team-members.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TeamCalendarComponent } from './team/team-calendar/team-calendar.component';
import { TeamHeaderComponent } from './team/team-header/team-header.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
@NgModule({
  declarations: [TeamsComponent, TeamComponent, TeamMembersComponent, TeamCalendarComponent, TeamHeaderComponent, CalendarComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    FontAwesomeModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  exports: [TeamsComponent]
})
export class TeamsModule { }
