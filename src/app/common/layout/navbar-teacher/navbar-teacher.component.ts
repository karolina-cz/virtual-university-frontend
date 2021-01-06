import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-teacher',
  templateUrl: './navbar-teacher.component.html',
  styleUrls: ['./navbar-teacher.component.css']
})
export class NavbarTeacherComponent implements OnInit {
  @Input() isToggled: boolean;
  @Output() toggled = new EventEmitter<boolean>();
  faHome = faHome;
  faUsers = faUsers;
  constructor() { }

  ngOnInit(): void {
  }

  onToggleClicked(){
    this.toggled.emit();
  }

}
