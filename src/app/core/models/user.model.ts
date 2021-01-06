export class User {
  username: string;
  firstname: string;
  lastname: string;
  isStudent: boolean;

  constructor(username: string, firstname: string, lastname: string, isStudent: boolean) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.isStudent = isStudent;
  }
}
