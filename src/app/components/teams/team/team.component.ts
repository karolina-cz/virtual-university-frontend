import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faFileAlt, faPlus, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../core/models/user.model';
import {Team} from '../../../core/models/team/team.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId;
  team: Team;
  model: NgbDateStruct;
  faFileAlt = faFileAlt;
  fileName = 'Nie wybrano pliku';
  faPlus = faPlus;
  faQuestionCircle = faQuestionCircle;
  constructor(private route: ActivatedRoute) {
    const members = [
      new User('kowalska', 'Anna', 'Kowalska', true),
      new User('nowakp', 'Piotr', 'Nowak', true),
      new User('kote', 'Estera', 'Kot', true)];
    this.team = new Team('Projekt inżynierski', 'Projekt inżynierski wykorzystujący Spring i Angular', members, null, null);
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params.id;
  }

  onDateSelected(event){
  }

  onFileSelected(target){
    this.fileName = target.files[0].name;
  }

  onSaveFileClicked(){

  }

}
