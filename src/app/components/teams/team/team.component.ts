import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faFileAlt, faPlus, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../core/models/user.model';
import {Team} from '../../../core/models/team/team.model';
import {TeamsService} from '../../../core/services/teams.service';
import {Observable} from 'rxjs';
import {MembersAutocompleteComponent} from '../members-autocomplete/members-autocomplete.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId;
  team: Team = new Team(null, null, null, null, null, null);
  model: NgbDateStruct;
  faFileAlt = faFileAlt;
  fileName = 'Nie wybrano pliku';
  faPlus = faPlus;
  faQuestionCircle = faQuestionCircle;
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

  onDateSelected(event){
  }

  onFileSelected(target){
    this.fileName = target.files[0].name;
  }

  onSaveFileClicked(){

  }

}
