import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Team} from '../../core/models/team/team.model';
import {User} from '../../core/models/user.model';
import {MatDialog} from '@angular/material/dialog';
import {MembersAutocompleteComponent} from './members-autocomplete/members-autocomplete.component';
import {AddTeamDialogComponent} from './add-team-dialog/add-team-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams: Team[] = [];
  teamsCount = 5;
  displayedFrom = 1;
  displayedTo = 5;
  constructor(private router: Router, public dialog: MatDialog, private toastr: ToastrService) {
    const members = [
      new User('kowalska', 'Anna', 'Kowalska', true),
      new User('nowakp', 'Piotr', 'Nowak', true),
      new User('kote', 'Estera', 'Kot', true)];
    this.teams.push(new Team('Projekt inżynierski', 'Projekt inżynierski wykorzystujący Spring i Angular', members, null, null));
    this.teams.push(new Team('Aplikacje Webowe', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', members, null, null));
    this.teams.push(new Team('Projekt z ochrony danych', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', members, null, null));
    this.teams.push(new Team('Projekt z sieci komputerowych', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', members, null, null));
    this.teams.push(new Team('Projekt zespołowy - CRM', 'fvevn veenr jc vi fher vebfhb fbvhebd dceidbrf uvhfuerh  erhugbcyue yuy hdgydgdf, hfgfyh, lsgtsbd, hgtaplb, bdgtard, ndhdh', members, null, null));
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true){
        this.toastr.success('Zespół został stworzony', '', {timeOut: 2000});
      } else if (result === false){
        this.toastr.error('Błąd podczas tworzenia zespołu', '', {timeOut: 2000});
      }
    });
  }

  ngOnInit(): void {
  }

  onTeamSelected(index: number){
    this.router.navigate(['/teams/' + index]);
  }

  onCancelNewTeamClicked(){
  }

  onSaveNewTeamClicked(){
  }

}
