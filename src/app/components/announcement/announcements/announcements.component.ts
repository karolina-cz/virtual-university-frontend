import { Component, OnInit } from '@angular/core';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons';
import {AnnouncementService} from '../../../core/services/announcement/announcement.service';
import {Announcement} from '../../../core/models/announcement/announcement.model';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  faEnvelope = faEnvelope;
  announcements = [];
  announcement: Announcement = new Announcement(null, null, null);
  constructor(private annService: AnnouncementService) { }

  ngOnInit(): void {
    this.annService.getAllAnnouncements().subscribe(data => {
      this.announcements = data;
      if (this.announcements.length > 0) {
        this.announcement = this.announcements[0];
      }
    });
  }
  changeAnnouncement(newAnnouncement) {
    this.announcement = newAnnouncement;
  }

}
