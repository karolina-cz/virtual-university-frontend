import {User} from '../user.model';
import {TeamEvent} from './team-event/team-event.model';

export class Team {
  title: string;
  description: string;
  members: User[];
  resources: File[];
  events: TeamEvent[];
  id: string;

  constructor(title: string, description: string, id: string, members: User[], resources: File[], events: TeamEvent[]) {
    this.title = title;
    this.description = description;
    this.id = id;
    this.members = members;
    this.resources = resources;
    this.events = events;
  }
}
