export class Announcement {
  subject: string;
  message: string;
  announcedOn: Date;

  constructor(subject: string, message: string, announcedOn: Date) {
    this.subject = subject;
    this.message = message;
    this.announcedOn = announcedOn;
  }
}
