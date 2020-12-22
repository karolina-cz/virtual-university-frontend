export class User {
  username: string;
  firstname: string;
  lastname: string;
  role: string;

  constructor(username: string, firstname: string, lastname: string, role: string) {
    this.username = username;
    this.firstname = firstname;
    this.lastname = lastname;
    this.role = role;
  }
}
