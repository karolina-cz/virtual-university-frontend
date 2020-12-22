import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faUsers} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar-student',
  templateUrl: './navbar-student.component.html',
  styleUrls: ['./navbar-student.component.css']
})
export class NavbarStudentComponent implements OnInit {
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
