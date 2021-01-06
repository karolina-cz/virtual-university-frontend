import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../../../core/models/team/team.model';
import {User} from '../../../../core/models/user.model';

@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})
export class TeamCalendarComponent implements OnInit {
  team: Team;
  constructor() {
    const members = [
      new User('kowalska', 'Anna', 'Kowalska', true),
      new User('nowakp', 'Piotr', 'Nowak', true),
      new User('kote', 'Estera', 'Kot', true)];
    this.team = new Team('Projekt inżynierski', 'Projekt inżynierski wykorzystujący Spring i Angular', members, null, null);
  }

  ngOnInit(): void {
  }

}
