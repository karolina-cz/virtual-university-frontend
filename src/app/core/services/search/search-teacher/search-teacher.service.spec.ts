import { TestBed } from '@angular/core/testing';

import { SearchTeacherService } from './search-teacher.service';

describe('SearchTeacherService', () => {
  let service: SearchTeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
