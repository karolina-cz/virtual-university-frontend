import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {UserAuthService} from '../../../core/services/user-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggled = new EventEmitter<boolean>();
  faUser = faUser;
  faSignOut = faSignOutAlt;
  name: string;
  constructor(private authService: UserAuthService, private router: Router) {
    this.name = authService.currentUserValue.firstname + ' ' + authService.currentUserValue.lastname;
  }

  ngOnInit(): void {
  }

  onToggleClicked(){
    this.toggled.emit();
  }

  onLogoutClicked(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
