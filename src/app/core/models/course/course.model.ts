export class Course {
  subject: string;
  assessmentMethods: string;
  id: string;
  ects: string;
  faculty: string;
  literature: string;
  statute: string;

  constructor(subject: string, assessmentMethods: string, id: string, ects: string, faculty: string, literature: string, statute: string) {
    this.subject = subject;
    this.assessmentMethods = assessmentMethods;
    this.id = id;
    this.ects = ects;
    this.faculty = faculty;
    this.literature = literature;
    this.statute = statute;
  }

}
