import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGradesTeacherComponent } from './course-grades-teacher.component';

describe('CourseGradesTeacherComponent', () => {
  let component: CourseGradesTeacherComponent;
  let fixture: ComponentFixture<CourseGradesTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGradesTeacherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGradesTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
