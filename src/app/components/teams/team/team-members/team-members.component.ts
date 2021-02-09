import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TeamsService} from '../../../../core/services/teams.service';
import {UserAuthService} from '../../../../core/services/user-auth.service';
import {MembersAutocompleteComponent} from '../../members-autocomplete/members-autocomplete.component';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit{
  @ViewChild(MembersAutocompleteComponent) memberAutocomplete: MembersAutocompleteComponent;
  faPencil = faPencilAlt;
  faTimes = faTimes;
  faUser = faUser;
  isEditingModeOn = false;
  isCurrentUserTeacher: boolean;

  @Input() members: User[];
  @Input() teamId;

  constructor(private teamsService: TeamsService, private authService: UserAuthService) {
    this.isCurrentUserTeacher = this.authService.currentUserValue.isStudent === false;
  }

  ngOnInit(): void {
  }

  onCancelClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    this.memberAutocomplete.onCancelClicked();
  }

  onSaveClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    this.memberAutocomplete.onSaveClicked();
    this.teamsService.addTeamMembers(this.teamId, this.memberAutocomplete.addedMembers).subscribe();
    this.teamsService.removeTeamMembers(this.teamId, this.memberAutocomplete.removedMembers).subscribe(
      () => {
        this.memberAutocomplete.resetEditValues();
      }
    );
  }

  onEditClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    this.memberAutocomplete.onEditClicked();
  }
}
