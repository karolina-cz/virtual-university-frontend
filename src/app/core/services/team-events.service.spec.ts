import { TestBed } from '@angular/core/testing';

import { TeamEventsService } from './team-events.service';

describe('TeamEventsService', () => {
  let service: TeamEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
