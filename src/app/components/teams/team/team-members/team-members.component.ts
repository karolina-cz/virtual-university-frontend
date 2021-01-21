import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {debounceTime, finalize, map, startWith, switchMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TeamsService} from '../../../../core/services/teams.service';
import {UserAuthService} from '../../../../core/services/user-auth.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {
  myControl = new FormControl();
  faPencil = faPencilAlt;
  faTimes = faTimes;
  faSearch = faSearch;
  faUser = faUser;
  isEditingModeOn = false;
  allItems = [new User('czachork', 'Karolina', 'Czachorska', true),
    new User('abcdef', 'Anna', 'Nowak', true),
    new User('mksxnak', 'Piotr', 'Kowalski', true)];
  teamMembers = [new User('czachork', 'Karolina', 'Czachorska', true),
    new User('abcdef', 'Anna', 'Nowak', true),
    new User('mksxnak', 'Piotr', 'Kowalski', true)];
  autoCompleteItems: Observable<User[]>;
  removedMembers: User[] = [];
  addedMembers: User[] = [];
  membersCopy: User[] = [];
  isCurrentUserTeacher: boolean;
  whitespaceStringRegex = new RegExp('\\S');
  isLoading = false;

  @Input() members: User[];

  constructor(private teamsService: TeamsService, private authService: UserAuthService) {
    this.isCurrentUserTeacher = this.authService.currentUserValue.isStudent === false;
  }

  ngOnInit(): void {
    this.autoCompleteItems = this.myControl.valueChanges.pipe(
      debounceTime(300),
      tap((value) => {
        if (this.whitespaceStringRegex.test(value)) {
          this.isLoading = true;
        }
      }),
      startWith(''),
      switchMap(value => {
        if (this.whitespaceStringRegex.test(value)) {
          return this.teamsService.getUsersByPattern(value).pipe(
            finalize(() => this.isLoading = false),
          );
        }
        return [];
      })
    );
  }

  onCancelClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    this.members = this.membersCopy;
    this.resetEditValues();
  }

  onSaveClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    for (let i = 0; i < this.removedMembers.length; i++) {
      for (let j = 0; j < this.addedMembers.length; j++) {
        if (this.removedMembers[i].username === this.addedMembers[j].username) {
          this.addedMembers.splice(j, 1);
          this.removedMembers.splice(i, 1);
        }
      }
    }
    this.resetEditValues();
  }

  resetEditValues() {
    this.membersCopy = [];
    this.addedMembers = [];
    this.removedMembers = [];
  }

  onRemoveMemberClicked(member, index) {
    if (!(this.removedMembers.filter(e => e.username === member.username).length > 0)) {
      this.removedMembers.push(member);
    }
    this.members.splice(index, 1);
  }

  private _filter(value: string) {
    let items = [];
    this.teamsService.getUsersByPattern(value).subscribe(
      (data) => {
        items = data;
      }
    );
    return items;
  }

  optionClicked(member: User) {
    if (!(this.addedMembers.filter(e => e.username === member.username).length > 0)) {
      this.addedMembers.push(member);
    }
    if (!(this.members.filter(e => e.username === member.username).length > 0)) {
      this.members.push(member);
    }
    this.myControl.setValue('');
  }

  onEditClicked() {
    this.isEditingModeOn = !this.isEditingModeOn;
    this.members.forEach(val => this.membersCopy.push(Object.assign({}, val)));
  }
}
