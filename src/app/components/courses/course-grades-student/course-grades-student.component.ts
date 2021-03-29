import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CourseService} from '../../../core/services/course/course.service';
import {Grade} from '../../../core/models/course/grade.model';
import {ActivatedRoute, Router} from '@angular/router';
import {faCheck, faPencilAlt} from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-grades-student',
  templateUrl: './course-grades-student.component.html',
  styleUrls: ['./course-grades-student.component.css']
})
export class CourseGradesStudentComponent implements OnInit {
  @ViewChild('modalChangeGroup', {static: true}) modalChangeGroup: TemplateRef<any>;
  grades;
  groupId;
  faPencil = faPencilAlt;
  availableGroups = [];
  myChangeGroupRequest = null;
  faCheck = faCheck;
  constructor(public modal: NgbModal, private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.groupId = this.route.snapshot.params.groupId;
    this.courseService.getCourseGrades(this.groupId).subscribe(data => {
      // @ts-ignore
      this.grades = data.userGrades[0].grades;
    });
    this.courseService.getChangeGroupRequestInfo(this.groupId).subscribe(data => {
      for (const groupData of data.records) {
        const group = {
          id: groupData.Id,
          teacher: groupData.Teacher_Name__c,
          startDate: new Date(groupData.Classes_Start_Date__c),
          endDate: new Date(groupData.Classes_End_Date__c)
        };
        this.availableGroups.push(group);
      }
    });
    this.courseService.getMyGroupChangeRequests(this.groupId).subscribe(data =>
    {
      this.myChangeGroupRequest = data;
    });
  }

  onChangeGroupClicked(newGroup) {
    this.myChangeGroupRequest = {
      id: '0',
      teacher: newGroup.teacher,
      startDate: newGroup.startDate,
      endDate: newGroup.endDate
    };
    this.courseService.createChangeGroupRequest(this.groupId, newGroup.id).subscribe(
      data => {
        this.myChangeGroupRequest.id = data.id;
      }
    );
  }

  onRemoveGroupChangeRequest(){
    this.courseService.removeChangeGroupRequest(this.myChangeGroupRequest.id).subscribe();
    this.myChangeGroupRequest = null;
  }

}
