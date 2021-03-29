import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MembersAutocompleteComponent} from '../members-autocomplete/members-autocomplete.component';
import {TeamsService} from '../../../core/services/teams.service';
import {Team} from '../../../core/models/team/team.model';

@Component({
  selector: 'app-add-team-dialog',
  templateUrl: './add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.css']
})
export class AddTeamDialogComponent implements OnInit {
  @ViewChild(MembersAutocompleteComponent) memberAutocomplete: MembersAutocompleteComponent;
  myForm: FormGroup;
  submitClicked = false;
  constructor(public dialogRef: MatDialogRef<AddTeamDialogComponent>, private formBuilder: FormBuilder,
              private teamsService: TeamsService) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      title: ['', [
        Validators.required
      ]],
      description: ['']
    });
  }

  get title() {
    return this.myForm.get('title');
  }

  get description() {
    return this.myForm.get('description');
  }

  onSaveNewTeamClicked(){
    this.submitClicked = true;
    if (this.myForm.valid) {
      const members = this.memberAutocomplete.members.map(user => user.username);
      this.teamsService.addTeam(this.title.value, this.description.value, members).subscribe(
        (data) => {
          if (data === 'error'){
            this.dialogRef.close(false);
          } else{
            this.dialogRef.close(new Team(this.title.value, this.description.value, data.team_id, this.memberAutocomplete.members,
              null, null));
          }
        }
      );
    }
  }

}
