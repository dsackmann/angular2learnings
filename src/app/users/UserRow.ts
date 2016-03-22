import {Component} from 'angular2/core';
import {Input} from 'angular2/core';
import {CORE_DIRECTIVES} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {User} from './User';

@Component({
  selector: 'user-row',
  providers: [
  ],
  directives: [
    CORE_DIRECTIVES,
    ROUTER_DIRECTIVES
  ],
  pipes: [ ],
  template: `
    <div [routerLink]="['/User', {id: user.userId }]">
      <span>username: {{user.loginName}} </span>
      <span>userId: {{user.userId}} </span>
      <span>clientId: {{user.clientId}} </span>
    </div>
    `
})
export class UserRow {
  @Input() user: User;
  constructor() {
  }

  ngOnInit() {
  }
}
