import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../../core/services/user-auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  isToggled = false;
  isStudent;

  constructor(private service: UserAuthService) {
    this.isStudent = service.currentUserValue.isStudent;
    if (window.innerWidth < 500){
      this.isToggled = true;
    }
  }

  ngOnInit(): void {
  }

}
