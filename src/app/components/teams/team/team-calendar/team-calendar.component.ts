import {Component, Input, OnInit} from '@angular/core';
import {Team} from '../../../../core/models/team/team.model';
import {User} from '../../../../core/models/user.model';
import {ActivatedRoute} from '@angular/router';
import {TeamsService} from '../../../../core/services/teams.service';

@Component({
  selector: 'app-team-calendar',
  templateUrl: './team-calendar.component.html',
  styleUrls: ['./team-calendar.component.css']
})
export class TeamCalendarComponent implements OnInit {
  team: Team = new Team(null, null, null, null, null, null) ;
  teamId;
  constructor(private route: ActivatedRoute, private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params.id;
    this.teamsService.getTeamInfo(this.teamId).subscribe(
      (data) => {
        this.team = data;
      }
    );
  }

}
