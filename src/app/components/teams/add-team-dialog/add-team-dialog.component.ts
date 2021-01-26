import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MembersAutocompleteComponent} from '../members-autocomplete/members-autocomplete.component';
import {TeamsService} from '../../../core/services/teams.service';

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
        () => {
          this.dialogRef.close(true);
        },
        () => {
          this.dialogRef.close(false);
      }
      );
    }
  }

}
