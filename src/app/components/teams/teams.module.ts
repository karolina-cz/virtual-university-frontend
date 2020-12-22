import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamsRoutingModule } from './teams-routing.module';
import {TeamsComponent} from './teams.component';
import {TeamComponent} from './team/team.component';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TeamMembersComponent } from './team/team-members/team-members.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { TeamCalendarComponent } from './team/team-calendar/team-calendar.component';

@NgModule({
  declarations: [TeamsComponent, TeamComponent, TeamMembersComponent, TeamCalendarComponent],
  imports: [
    CommonModule,
    TeamsRoutingModule,
    FormsModule,
    NgbDatepickerModule,
    NgbModule,
    FontAwesomeModule
  ],
  exports: [TeamsComponent]
})
export class TeamsModule { }
