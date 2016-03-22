import {Component} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {UserService} from './services/UserService';
import {UserRow} from './UserRow';
import {User} from './User';

@Component({
  selector: 'user-list',
  providers: [
    UserService
  ],
  directives: [
    CORE_DIRECTIVES,
    UserRow
  ],
  pipes: [ ],
  template: `<user-row *ngFor="#user of users" [user]="user"></user-row>`
})
export class UserList {
  public users: Array<User>;
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
}
