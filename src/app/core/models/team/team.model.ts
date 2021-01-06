import {User} from '../user.model';
import {TeamEvent} from './team-event/team-event.model';

export class Team {
  title: string;
  description: string;
  members: User[];
  resources: File[];
  events: TeamEvent[];

  constructor(title: string, description: string, members: User[], resources: File[], events: TeamEvent[]) {
    this.title = title;
    this.description = description;
    this.members = members;
    this.resources = resources;
    this.events = events;
  }
}
