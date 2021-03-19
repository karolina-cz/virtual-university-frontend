import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {ActivatedRoute} from '@angular/router';
import {faPencilAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {Grade} from '../../../core/models/course/grade.model';

@Component({
  selector: 'app-course-grades-teacher',
  templateUrl: './course-grades-teacher.component.html',
  styleUrls: ['./course-grades-teacher.component.css']
})
export class CourseGradesTeacherComponent implements OnInit {
  @ViewChild('modalAddColumn', {static: true}) modalAddColumn: TemplateRef<any>;
  groupId;
  studentsGrades;
  faPencil = faPencilAlt;
  gradeSubjects = [];
  isEditingModeOn = false;
  faCirclePlus = faPlusCircle;
  changes = [];
  constructor(public modal: NgbModal, private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params.groupId;
    this.courseService.getCourseGrades(this.groupId).subscribe(data => {
      console.log(data);
      // @ts-ignore
      this.studentsGrades = data.userGrades;
      // @ts-ignore
      this.gradeSubjects = data.gradeSubjects;
    });
  }

  getGradeBySubject(studentGradeInfo, gradeSubject) {
    for (const grade of studentGradeInfo.grades) {
      if (grade.name === gradeSubject) {
        return grade;
      }
    }
    return '-';
  }

  onEditClicked() {
    this.isEditingModeOn = true;
  }
  onCancelClicked() {
    this.isEditingModeOn = false;
  }
  onSaveClicked() {
    this.isEditingModeOn = false;
  }

  addColumn(form: NgForm) {
    this.gradeSubjects.push(form.value.column);
  }

  onGradeChanged(studentGradeInfo, gradeSubject, newGrade) {
    const grade = this.getGradeBySubject(studentGradeInfo, gradeSubject);
    if (grade !== '-'){
      grade.value = newGrade;
      if (newGrade === '-'){
        console.log('delete' );
        this.courseService.removeGrade(grade.id).subscribe();
      } else {
        this.courseService.updateGrade(newGrade, gradeSubject, grade.id).subscribe(data => {
          console.log('ok' + data);
        });
        console.log('update with value' + newGrade);
      }
    } else {
      if (newGrade !== '-'){
        // create
        console.log('create');
        const createdGrade = new Grade('0', gradeSubject, newGrade);
        studentGradeInfo.grades.push(createdGrade);
        this.courseService.addGrade(newGrade, gradeSubject, studentGradeInfo.didacticGroupAttendee).subscribe(
          data => {
            createdGrade.id = data.id;
          }
        );
      }
    }
  }

}
