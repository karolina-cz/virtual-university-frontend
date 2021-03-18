import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGradesStudentComponent } from './course-grades-student.component';

describe('CourseGradesStudentComponent', () => {
  let component: CourseGradesStudentComponent;
  let fixture: ComponentFixture<CourseGradesStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGradesStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGradesStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
