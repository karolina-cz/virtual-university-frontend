import { Component, OnInit } from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  faPencil = faPencilAlt;
  faTimes = faTimes;
  faSearch = faSearch;
  faUser = faUser;
  isEditingModeOn = false;
  teamMembers = [new User('czachork', 'Karolina', 'Czachorska', 'student'),
    new User('abcdef', 'Anna', 'Nowak', 'student'),
    new User('mksxnak', 'Piotr', 'Kowalski', 'student')];

  constructor() { }

  ngOnInit(): void {
  }
  onCancelClicked(){
    this.isEditingModeOn = !this.isEditingModeOn;
  }

  onSaveClicked(){
    this.isEditingModeOn = !this.isEditingModeOn;
  }

}
