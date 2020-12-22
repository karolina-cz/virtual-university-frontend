import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {faFileAlt, faPlus, faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId;
  model: NgbDateStruct;
  faFileAlt = faFileAlt;
  fileName = 'Nie wybrano pliku';
  faPlus = faPlus;
  faQuestionCircle =faQuestionCircle;
  constructor(private route: ActivatedRoute, private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.teamId = this.route.snapshot.params.id;
    console.log(this.teamId);
  }

  onDateSelected(event){
    console.log('selected');
  }

  onFileSelected(target){
    this.fileName = target.files[0].name;
    console.log(target.files);
  }

  onSaveFileClicked(){

  }

}
