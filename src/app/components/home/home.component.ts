import { Component, OnInit } from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isToggled = false;
  faHome = faHome;
  faUsers = faUsers;
  faUser = faUser;
  faSignOut = faSignOutAlt;
  constructor() { }
  ngOnInit(): void {
  }

}
