import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../core/services/user-auth.service';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  memberType;
  constructor(private authService: UserAuthService) {
    this.user = authService.currentUserValue;
    this.memberType = this.user.isStudent ? 'Student' : 'Nauczyciel';
  }

  ngOnInit(): void {
  }

}
