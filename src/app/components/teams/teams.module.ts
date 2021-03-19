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
import flatpickr from 'flatpickr';
import {Polish} from 'flatpickr/dist/l10n/pl';
import { MembersAutocompleteComponent } from './members-autocomplete/members-autocomplete.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { AddTeamDialogComponent } from './add-team-dialog/add-team-dialog.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { EventFormComponent } from './calendar/event-form/event-form.component';
import {EventFreqPipe} from '../../core/pipes/event-freq.pipe';
import {DayofweekPipe} from '../../core/pipes/dayofweek.pipe';

export function flatpickrFactory() {
  flatpickr.localize(Polish);
  return flatpickr;
}
@NgModule({
  declarations: [
    TeamsComponent,
    TeamComponent,
    TeamMembersComponent,
    TeamCalendarComponent,
    TeamHeaderComponent,
    CalendarComponent,
    MembersAutocompleteComponent,
    AddTeamDialogComponent,
    EventFormComponent,
    EventFreqPipe,
    DayofweekPipe],
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
    MatDialogModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
    exports: [TeamsComponent, DayofweekPipe],
  bootstrap: [MembersAutocompleteComponent],
  providers: [
  MatDialog
]
})
export class TeamsModule { }
