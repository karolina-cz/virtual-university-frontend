import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  teams = [{name: 'Projekt zespołowy', description: 'Na projekcie zespołowym uczymy się współpracy i zdobywamy nowe umiejętności.', id: 12},
    {name: 'Projekt inżynierski', description: 'Tutaj już jest grubo', id: 21}];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onTeamSelected(index: number){
    console.log(index);
    this.router.navigate(['/teams/' + index]);
  }

}
