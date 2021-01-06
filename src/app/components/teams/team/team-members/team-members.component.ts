import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../core/models/user.model';
import {faPencilAlt, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {TeamsService} from '../../../../core/services/teams.service';

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
  @Input() members: User[];
  constructor(private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.autoCompleteItems = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  onCancelClicked(){
    this.isEditingModeOn = !this.isEditingModeOn;
  }

  onSaveClicked(){
    this.isEditingModeOn = !this.isEditingModeOn;
  }

  private _filter(value: string){
    const items = this.teamsService.getUsersByPattern();
    return items;
    // const filterValue = value.toLowerCase();
    //
    // return this.allItems.filter(option => option.firstname.toLowerCase().indexOf(filterValue) === 0);
  }

  optionClicked(option: User){
    this.members.push(option);
    this.myControl.setValue('');
  }
}
